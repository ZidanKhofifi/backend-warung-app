const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const {verifyToken} = require('../middleware/auth')

router.post("/api/orders", verifyToken, orderController.createOrder)
router.get("/api/orders", verifyToken, orderController.getAllOrders)
router.patch("/api/orders/:id", verifyToken, orderController.updateStatus)
router.put("/api/orders/:id/cancel", verifyToken, orderController.cancelOrder)
router.get("/api/myorder", verifyToken, orderController.getMyOrders)

module.exports = router