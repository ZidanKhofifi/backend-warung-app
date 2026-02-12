const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
require('dotenv').config()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173"], // Ganti dengan URL FE nanti
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI).then(console.log("berhasil konek ke mongodb atlas")).catch((e) => console.log(e))

app.use(authRoute)
app.use(productRoute)
app.use(orderRoute)

app.listen(3000, () => {
  console.log('running at http://localhost:3000')
})

module.exports = app;