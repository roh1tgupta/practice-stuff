import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import pinoHttp from 'pino-http'
import path from 'path'
import { fileURLToPath } from 'url'
import { logger } from './utils/logger.js'
import { loadConfig } from './config/index.js'
import { router as apiRouter } from './routes/api.js'
import { router as redirectRouter } from './routes/redirect.js'
import { errorHandler, notFoundHandler } from './middleware/errors.js'
import { requestCountersMiddleware } from './middleware/metrics.js'
import { readinessHandler, incInFlight, decInFlight } from './utils/readiness.js'

loadConfig()

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.disable('x-powered-by')
// behind proxies (NGINX/ELB/etc.) to ensure req.ip and secure cookies work properly
app.set('trust proxy', 1)
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json({ limit: '1mb' }))
// Log only failed requests; suppress successful ones
app.use(pinoHttp({
  logger,
  // Don't log health/readiness noise
  autoLogging: {
    ignore: (req) =>
      req.url === '/healthz' ||
      req.url === '/readyz' ||
      req.url === '/.well-known/appspecific/com.chrome.devtools.json'
  },
  // Choose level per request; 'silent' disables logging for that request
  customLogLevel: (req, res, err) => {
    if (err) return 'error'
    if (res.statusCode >= 500) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'silent' // do not log 2xx/3xx
  }
}))
app.use(requestCountersMiddleware)
// Track in-flight requests for connection draining during shutdown
app.use((req, res, next) => {
  incInFlight()
  res.on('finish', () => decInFlight())
  res.on('close', () => decInFlight())
  next()
})

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})
app.get('/readyz', readinessHandler)

// Serve static assets and index page
app.use(express.static(path.join(__dirname, '../public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use('/api/v1', apiRouter)
app.use('/', redirectRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
