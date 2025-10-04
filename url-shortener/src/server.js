import cluster from 'node:cluster'
import os from 'node:os'
import { createServer } from 'http'
import app from './app.js'
import { logger } from './utils/logger.js'
import { config } from './config/index.js'
import { connectMongo } from './storage/mongo.js'
import { redis } from './storage/redis.js'
import { registerMetrics, metricsServer } from './utils/metrics.js'
import mongoose from 'mongoose'
import { setReady, getInFlight } from './utils/readiness.js'

const port = process.env.PORT || 3000
const metricsPort = Number(process.env.METRICS_PORT || 9090)

let httpServer

// Determine clustering mode early so start() can decide whether to run metrics here
const useCluster = process.env.CLUSTER === '1' || !!process.env.WEB_CONCURRENCY

async function start() {
  try {
    await connectMongo()
    await redis.ping()
    logger.info({ host: config.redis.host, port: config.redis.port, db: config.redis.db }, 'Redis connected')
    registerMetrics()

    httpServer = createServer(app)

    httpServer.listen(port, () => {
      logger.info({ port }, `HTTP server listening on port ${port}`)
      // Friendly startup summary
      try {
        const base = config.baseUrl.replace(/\/$/, '')
        logger.info('Service endpoints')
        logger.info({ url: `${base}/` }, 'UI: Root page')
        logger.info({ method: 'POST', url: `${base}/api/v1/shorten` }, 'API: Create short URL')
        logger.info({ method: 'GET', url: `${base}/api/v1/expand/:code` }, 'API: Expand short code')
        logger.info({ method: 'GET', url: `${base}/:code` }, 'Redirect: Short URL')
        logger.info({ url: `${base}/healthz` }, 'Health endpoint')
        logger.info({ url: `${base}/readyz` }, 'Readiness endpoint')
        if (!useCluster) {
          logger.info({ url: `http://localhost:9090/metrics` }, 'Metrics endpoint')
        }
      } catch {}
    })

    // In non-cluster mode, the single process also exposes metrics
    if (!useCluster) {
      const server = metricsServer.listen(metricsPort, () => {
        logger.info({ port: metricsPort }, 'Metrics server listening')
      })
      server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
          logger.warn({ port: metricsPort }, 'Metrics port in use; skipping metrics server')
        } else {
          logger.error({ err }, 'Metrics server failed to start')
        }
      })
    }

    // Graceful shutdown for worker processes
    const shutdown = async (signal) => {
      try {
        logger.warn({ signal, pid: process.pid }, 'Shutting down gracefully')
        // Mark instance as not ready so load balancers stop sending new traffic
        setReady(false)
        // Stop accepting new connections
        await new Promise((resolve) => httpServer?.close(() => resolve()))
        if (!useCluster) {
          await new Promise((resolve) => metricsServer?.close(() => resolve()))
        }
        // Wait for in-flight requests to finish (up to 10s)
        const drainStart = Date.now()
        const drainTimeoutMs = 10000
        while (getInFlight() > 0 && Date.now() - drainStart < drainTimeoutMs) {
          await new Promise((r) => setTimeout(r, 100))
        }
        // Close DB/Cache
        await mongoose.connection.close(false)
        await redis.quit()
        logger.info('Shutdown complete')
        process.exit(0)
      } catch (err) {
        logger.error({ err }, 'Error during shutdown, forcing exit')
        process.exit(1)
      }
    }

    process.on('SIGINT', () => shutdown('SIGINT'))
    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('uncaughtException', (err) => {
      logger.error({ err }, 'Uncaught exception')
      shutdown('uncaughtException')
    })
    process.on('unhandledRejection', (reason) => {
      logger.error({ reason }, 'Unhandled rejection')
      shutdown('unhandledRejection')
    })
  } catch (err) {
    logger.error({ err }, 'Failed to start the server')
    process.exit(1)
  }
}

if (useCluster && cluster.isPrimary) {
  const desired = Number(process.env.WEB_CONCURRENCY || os.cpus().length)
  const cpuCount = Math.max(1, Math.min(os.cpus().length, desired))
  logger.info({ cpuCount }, 'Starting cluster primary')
  // Primary exposes metrics when clustering is enabled
  const primaryMetrics = metricsServer.listen(metricsPort, () => {
    logger.info({ port: metricsPort }, 'Metrics server (primary) listening')
  })
  primaryMetrics.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      logger.warn({ port: metricsPort }, 'Metrics port in use on primary; skipping metrics server')
    } else {
      logger.error({ err }, 'Metrics server (primary) failed to start')
    }
  })
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.warn({ worker: worker.process.pid, code, signal }, 'Worker exited, forking a new one')
    cluster.fork()
  })

  // Primary handles signals by asking workers to shutdown
  const shutdownPrimary = (signal) => {
    logger.warn({ signal }, 'Primary shutting down, signaling workers')
    try {
      metricsServer.close()
    } catch {}
    for (const id in cluster.workers) {
      const w = cluster.workers[id]
      if (w && w.isConnected()) {
        try { w.process.kill('SIGTERM') } catch {}
      }
    }
    // Give workers time to exit, then exit primary
    const timeout = setTimeout(() => {
      logger.error('Forcing primary exit after timeout')
      process.exit(1)
    }, 10000)
    let remaining = Object.keys(cluster.workers).length
    cluster.on('exit', () => {
      remaining--
      if (remaining <= 0) {
        clearTimeout(timeout)
        logger.info('All workers exited, primary exiting')
        process.exit(0)
      }
    })
  }

  process.on('SIGINT', () => shutdownPrimary('SIGINT'))
  process.on('SIGTERM', () => shutdownPrimary('SIGTERM'))
} else {
  start()
}
