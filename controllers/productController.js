const Product = require('../models/productModel')

exports.addProduct = async(req, res) => {
  const {nama, harga, kategori, image} = req.body
  if (!nama || !harga || !kategori || !image) {
    return res.status(4000).json({
      success: false,
      message: "harap isi semua bidang"
    })
  }
  
  try {
    const newProduct = new Product({
      nama,
      harga,
      kategori,
      image
    })
    await newProduct.save()
    res.status(201).json({
      success: true,
      message: "berhasil menambahkan product"
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "gagal menambahkan product"
    })
  }
}

exports.getProduct = async (req, res) => {
  try {
    const data = await Product.find()
    res.status(200).json({
      success: true,
      message: "berhasil mengambil data",
      data
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "gagal mengambil data"
    })
  }
}

exports.updateStok = async (req, res) => {
  const isAvailable = req.body
  
  try {
    await Product.findByIdAndUpdate(req.params.id, isAvailable)
    res.status(200).json({
      success: true,
      message: "berhasil mengubah status stok"
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "gagal mengubah status stok"
    })
  }
}

exports.deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "berhasil menghapus produk"
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "gagal menghapus produk"
    })
  }
}