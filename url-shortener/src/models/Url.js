import mongoose from 'mongoose'

// Use `_id` as the public short code (string)
const UrlSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  longUrl: { type: String, required: true, index: true },
  // TTL expiration timestamp (no inline index, defined explicitly below)
  expiresAt: { type: Date, default: null },
  visits: { type: Number, default: 0 },
  meta: {
    ip: String,
    userAgent: String
  }
}, {
  timestamps: true
})

// Expose a virtual alias so doc.shortCode returns the same as _id
UrlSchema.virtual('shortCode').get(function () { return this._id })

// TTL index (only applies when expiresAt is a Date)
UrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $type: 'date' } } })
UrlSchema.index({ createdAt: 1 })

export const Url = mongoose.model('Url', UrlSchema)
