const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama produk wajib diisi'],
    trim: true
  },
  harga: {
    type: Number,
    required: [true, 'Harga wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  kategori: {
    type: String,
    required: true,
    enum: {
      values: ['makanan', 'minuman'],
      message: '{VALUE} bukan kategori yang valid'
    },
    lowercase: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
