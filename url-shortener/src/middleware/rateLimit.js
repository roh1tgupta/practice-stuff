import { RateLimiterRedis } from 'rate-limiter-flexible'
import { redis } from '../storage/redis.js'
import { config } from '../config/index.js'

const limiterCache = new Map()

function getLimiter(key) {
  if (limiterCache.has(key)) return limiterCache.get(key)
  const limiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: `rl:${key}`,
    points: config.rateLimit.maxPerWindow,
    duration: config.rateLimit.windowSeconds
  })
  limiterCache.set(key, limiter)
  return limiter
}

export function rateLimitMiddleware(prefix = 'global') {
  const limiter = getLimiter(prefix)
  return async (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    try {
      await limiter.consume(ip)
      next()
    } catch (rej) {
      res.set('Retry-After', String(Math.ceil(rej.msBeforeNext / 1000)))
      res.status(429).json({ error: 'Too Many Requests' })
    }
  }
}
