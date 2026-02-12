const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {verifyToken} = require('../middleware/auth')

router.post("/api/register", authController.register)
router.post("/api/login", authController.login)
router.post("/api/logout", verifyToken, authController.logout)
router.get("/api/me", verifyToken, authController.getMe)
router.get("/api/users", verifyToken, authController.getAllUser)
router.post("/api/refresh-token", authController.refreshToken)

module.exports = router