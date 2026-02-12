const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalBayar } = req.body;

    // Validasi input
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Keranjang tidak boleh kosong" 
      });
    }

    // Membuat objek order baru
    const newOrder = new Order({
      // req.user._id didapat dari middleware auth (JWT)
      user: req.user.id, 
      items: items,
      totalBayar: totalBayar,
      status: 'pending', // Default status
      metodeBayar: 'Bayar di Kasir'
    });

    // Simpan ke database
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat",
      data: savedOrder
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: "Gagal membuat pesanan", 
      error: error.message 
    });
  }
};

// 2. Mengambil Pesanan Milik User (Untuk halaman My Orders)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Mengambil Semua Pesanan (Hanya untuk Admin)
exports.getAllOrders = async (req, res) => {
  try {
    // .populate('user', 'namaLengkap nomorWA') 
    // agar admin tahu siapa yang pesan
    const orders = await Order.find()
      .populate('user', 'username noWa')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const status = req.body
  
  try {
    await Order.findByIdAndUpdate(req.params.id, status)
    res.status(200).json({
      success: true,
      message: "berhasil update status Pesanan"
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "gagal update status pesanan"
    })
  }
}

// Controller untuk membatalkan pesanan
exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id; // Diambil dari middleware auth

    // Cari order berdasarkan ID dan pastikan pemiliknya sama
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
    }

    // CEK STATUS: Hanya bisa batal jika status masih 'pending'
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: "Pesanan tidak dapat dibatalkan karena sedang diproses atau sudah selesai" 
      });
    }

    // Update status ke dibatalkan
    order.status = 'dibatalkan';
    await order.save();

    res.json({ success: true, message: "Pesanan berhasil dibatalkan", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

