const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const LANG = require('./languages');

const chunkSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, maxlength: 40 },
  description: { type: String },
  content: { type: String },
  language: { type: String, enum: LANG, required: true, default: 'javascript'},
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tags: [String]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Chunk = mongoose.model('Chunk', chunkSchema);
module.exports = Chunk;
