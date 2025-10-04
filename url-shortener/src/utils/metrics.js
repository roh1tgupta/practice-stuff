import client from 'prom-client'
import http from 'http'

export const register = new client.Registry()
client.collectDefaultMetrics({ register })

export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
})

export function registerMetrics() {
  // Additional custom metrics can be registered here
}

export const metricsServer = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', register.contentType)
    const metrics = await register.metrics()
    res.end(metrics)
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
})
