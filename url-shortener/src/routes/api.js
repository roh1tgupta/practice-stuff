import { Router } from 'express'
import { z } from 'zod'
import { config } from '../config/index.js'
import { Url } from '../models/Url.js'
import { generateUniqueShortCode } from '../services/keygen.js'
import { redis } from '../storage/redis.js'
import { rateLimitMiddleware } from '../middleware/rateLimit.js'

export const router = Router()

const shortenSchema = z.object({
  url: z.string().url(),
  customCode: z.string().min(4).max(32).optional(),
  ttlSeconds: z.number().int().min(0).max(config.ttl.maxSeconds).optional()
})

router.post('/shorten', rateLimitMiddleware('shorten'), async (req, res, next) => {
  try {
    const parsed = shortenSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parsed.error.flatten() })
    }
    const { url, customCode, ttlSeconds } = parsed.data

    let shortCode = customCode
    if (shortCode) {
      const exists = await Url.exists({ _id: shortCode })
      if (exists) return res.status(409).json({ error: 'Custom code already in use' })
    } else {
      shortCode = await generateUniqueShortCode()
    }

    const expiresAt = (() => {
      const ttl = typeof ttlSeconds === 'number' ? ttlSeconds : config.ttl.defaultSeconds
      if (!ttl || ttl <= 0) return null
      return new Date(Date.now() + ttl * 1000)
    })()

    // Attempt to create the document, retrying on duplicate key errors (race condition)
    let doc = null
    for (let attempt = 0; attempt < config.keygen.maxRetries; attempt++) {
      try {
        doc = await Url.create({
          _id: shortCode,
          longUrl: url,
          expiresAt,
          meta: {
            ip: req.ip,
            userAgent: req.headers['user-agent'] || ''
          }
        })
        break // success
      } catch (err) {
        // 11000 is Mongo duplicate key error code
        if (err && err.code === 11000) {
          if (customCode) {
            // Caller requested a specific code that is taken
            return res.status(409).json({ error: 'Custom code already in use' })
          }
          // Regenerate a new code and retry
          shortCode = await generateUniqueShortCode()
          continue
        }
        throw err
      }
    }

    if (!doc) {
      // Could not create after retries
      return res.status(503).json({ error: 'Service busy, try again' })
    }

    // Cache both mappings: code->url and url->code for quick expand
    const pipeline = redis.multi()
    pipeline.set(`code:${shortCode}:url`, url)
    if (expiresAt) {
      const ttl = Math.ceil((expiresAt.getTime() - Date.now()) / 1000)
      pipeline.expire(`code:${shortCode}:url`, ttl)
    }
    pipeline.set(`url:${url}:code`, shortCode)
    if (expiresAt) {
      const ttl = Math.ceil((expiresAt.getTime() - Date.now()) / 1000)
      pipeline.expire(`url:${url}:code`, ttl)
    }
    await pipeline.exec()

    return res.status(201).json({
      shortCode,
      shortUrl: `${config.baseUrl}/${shortCode}`,
      longUrl: url,
      expiresAt
    })
  } catch (err) {
    next(err)
  }
})

router.get('/expand/:code', async (req, res, next) => {
  try {
    const { code } = req.params
    const cacheKey = `code:${code}:url`
    let longUrl = await redis.get(cacheKey)
    if (!longUrl) {
      const doc = await Url.findById(code).lean()
      if (!doc) return res.status(404).json({ error: 'Not found' })
      longUrl = doc.longUrl
      const ttl = doc.expiresAt ? Math.ceil((new Date(doc.expiresAt).getTime() - Date.now()) / 1000) : 0
      if (ttl > 0) {
        await redis.set(cacheKey, longUrl, 'EX', ttl)
      } else {
        await redis.set(cacheKey, longUrl)
      }
    }
    res.json({ code, longUrl })
  } catch (err) {
    next(err)
  }
})

export default router
