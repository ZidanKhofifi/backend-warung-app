# 🍜 Kedai Digital API (Backend)

Sistem manajemen pesanan berbasis Node.js & Express untuk operasional dapur dan kasir.

## 🚀 Fitur Utama
* **Order Management**: Real-time antrean pesanan.
* **WhatsApp Integration**: Notifikasi otomatis ke pelanggan via API WA.
* **Status Workflow**: Alur pesanan dari Pending -> Diproses -> Siap Ambil -> Selesai.
* **Security**: JWT Authentication & Role-based Access (Admin/User).

## 🛠️ Teknologi
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (Mongoose)
* **Alerts**: SweetAlert2 (Integration ready)
* **Deployment**: Vercel Serverless Functions

## 📦 Instalasi Lokal
1. Clone repositori backend.
2. Jalankan `npm install`.
3. Buat file `.env` dan lengkapi datanya:
   ```env
   PORT = 5000
   MONGO_URI = isi_dengan_url_mongodb_atlas
   JWT_SECRET = rahasia_dapur_anda
