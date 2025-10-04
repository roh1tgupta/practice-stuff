import { logger } from '../utils/logger.js'

export function notFoundHandler(req, res, next) {
  res.status(404).json({ error: 'Not Found' })
}

export function errorHandler(err, req, res, next) { // eslint-disable-line
  logger.error({ err, path: req.path }, 'Unhandled error')
  res.status(500).json({ error: 'Internal Server Error' })
}
