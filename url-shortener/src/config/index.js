import dotenv from 'dotenv'

let loaded = false

export function loadConfig() {
  if (loaded) return

  // If you need to load a different filename or path,
  // dotenv.config({ path: 'path/to/file' }) supports that.
  
  dotenv.config(); // This reads key-value pairs from a file named .env
  // in your project root and loads them into process.env.

  // If you want .env to override already-set environment variables, 
  // you can use dotenv.config({ override: true })

  loaded = true
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',

  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener',
    maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 50)
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    db: Number(process.env.REDIS_DB || 0)
  },

  rateLimit: {
    windowSeconds: Number(process.env.RATE_WINDOW_SECONDS || 60),
    maxPerWindow: Number(process.env.RATE_MAX_PER_WINDOW || 100)
  },

  keygen: {
    length: Number(process.env.KEY_LENGTH || 8),
    alphabet: process.env.KEY_ALPHABET || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    maxRetries: Number(process.env.MAX_KEYGEN_RETRIES || 5)
  },

  ttl: {
    defaultSeconds: Number(process.env.DEFAULT_TTL_SECONDS || 0),
    maxSeconds: Number(process.env.MAX_TTL_SECONDS || 31536000)
  }
}
