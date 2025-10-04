import { httpRequestCounter } from '../utils/metrics.js'

export function requestCountersMiddleware(req, res, next) {
  res.on('finish', () => {
    const labels = { method: req.method, route: req.route?.path || req.path, status: String(res.statusCode) }
    httpRequestCounter.inc(labels)
  })
  next()
}
