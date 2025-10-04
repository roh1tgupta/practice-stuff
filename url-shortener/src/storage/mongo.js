import mongoose from 'mongoose'
import { config } from '../config/index.js'
import { logger } from '../utils/logger.js'

export async function connectMongo() {
  mongoose.set('strictQuery', true)
  const uri = config.mongo.uri
  await mongoose.connect(uri, {
    maxPoolSize: config.mongo.maxPoolSize
  })
  logger.info({ uri }, 'Connected to MongoDB')
}
