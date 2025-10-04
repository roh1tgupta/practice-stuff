import { redis } from '../storage/redis.js'

export async function incrementVisitCounters(code) {
  const pipeline = redis.multi()
  pipeline.incr('stats:visits:total')
  pipeline.hincrby(`stats:code:${code}`, 'visits', 1)
  pipeline.hset(`stats:code:${code}`, 'lastAccess', Date.now())
  await pipeline.exec()
}
