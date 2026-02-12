const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // Relasi ke User
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Nomor pesanan unik (Contoh: GOR-5521)
  orderId: { 
    type: String, 
    unique: true,
    default: () => `GOR-${Math.floor(1000 + Math.random() * 9000)}` 
  },

  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    nama: String,
    harga: Number,
    qty: Number
  }],

  totalBayar: { type: Number, required: true },
  
  status: { 
    type: String, 
    enum: ['pending', 'diproses', 'siap_ambil', 'selesai', 'dibatalkan'], 
    default: 'pending' 
  },

  metodeBayar: { type: String, default: 'Bayar di Kasir' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
