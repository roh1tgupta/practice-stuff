import { Router } from 'express'
import { Url } from '../models/Url.js'
import { redis } from '../storage/redis.js'
import { incrementVisitCounters } from '../services/visits.js'

export const router = Router()

router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params
    const cacheKey = `code:${code}:url`
    let longUrl = await redis.get(cacheKey)

    if (!longUrl) {
      const doc = await Url.findById(code)
      if (!doc) return res.status(404).send('Not found')
      longUrl = doc.longUrl
      const ttl = doc.expiresAt ? Math.ceil((new Date(doc.expiresAt).getTime() - Date.now()) / 1000) : 0
      if (ttl > 0) {
        await redis.set(cacheKey, longUrl, 'EX', ttl)
      } else {
        await redis.set(cacheKey, longUrl)
      }
      // increment visits in Mongo (eventually we can move to async job)
      await Url.updateOne({ _id: doc._id }, { $inc: { visits: 1 } })
    } else {
      await Url.updateOne({ _id: code }, { $inc: { visits: 1 } })
    }

    // Increment analytics counters in Redis
    incrementVisitCounters(code).catch(() => {})

    // Basic open redirect prevention: if longUrl missing scheme, add http://
    if (!/^https?:\/\//i.test(longUrl)) {
      longUrl = `http://${longUrl}`
    }

    res.redirect(302, longUrl)
  } catch (err) {
    next(err)
  }
})

export default router
