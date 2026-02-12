const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

const {verifyToken} = require('../middleware/auth')



router.post('/api/product', verifyToken, productController.addProduct)
router.get('/api/product', productController.getProduct)
router.patch('/api/product/:id', verifyToken, productController.updateStok)
router.delete('/api/product/:id', verifyToken, productController.deleteProduct)

module.exports = router