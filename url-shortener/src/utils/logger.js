import pino from 'pino'
import { loadConfig } from '../config/index.js'

// Ensure environment variables from .env are loaded before creating the logger
loadConfig()

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: { colorize: true }
  } : undefined
})
