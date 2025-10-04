import Redis from 'ioredis'
import { config } from '../config/index.js'
import { logger } from '../utils/logger.js'

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  db: config.redis.db,
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  lazyConnect: false
})

redis.on('connect', () => logger.info('Redis connecting...'))
redis.on('ready', () => logger.info('Redis ready'))
redis.on('error', (err) => logger.error({ err }, 'Redis error'))
redis.on('end', () => logger.warn('Redis connection closed'))
