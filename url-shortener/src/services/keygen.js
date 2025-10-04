import { customAlphabet } from 'nanoid'
import { config } from '../config/index.js'
import { Url } from '../models/Url.js'

const gen = customAlphabet(config.keygen.alphabet, config.keygen.length)

export async function generateUniqueShortCode() {
  for (let i = 0; i < config.keygen.maxRetries; i++) {
    const code = gen()
    const exists = await Url.exists({ shortCode: code })
    if (!exists) return code
  }
  throw new Error('Failed to generate unique short code after retries')
}
