const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
require('dotenv').config();

// 1. Setup CORS dengan fleksibilitas untuk Production
const allowedOrigins = [
  "http://localhost:5173", 
  "https://nama-project-frontend.vercel.app" // GANTI dengan URL Vercel Frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // izinkan request tanpa origin (seperti mobile apps atau curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy block'), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// 2. Optimasi Koneksi MongoDB (Penting untuk Serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Tunggu maksimal 5 detik
    });
    isConnected = db.connections[0].readyState;
    console.log("Berhasil konek ke MongoDB Atlas");
  } catch (err) {
    console.error("Gagal koneksi database:", err);
  }
};

// 3. Middleware untuk memastikan koneksi sedia sebelum kueri dijalankan
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 4. Routes
app.use(authRoute);
app.use(productRoute);
app.use(orderRoute);

// 5. Handling Listen untuk Lokal vs Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
  });
}

// 6. Export untuk Vercel
module.exports = app;
