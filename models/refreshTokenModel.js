const mongoose = require('mongoose')

const refreshSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    trim: true,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('RefreshToken', refreshSchema)