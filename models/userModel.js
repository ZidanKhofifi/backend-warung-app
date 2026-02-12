const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  noWa: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},
{
  timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)