# 🍜 Kedai Digital API (Backend)

Backend API untuk sistem manajemen pesanan Kedai Digital.  
Dibangun menggunakan Node.js, Express, dan MongoDB dengan arsitektur RESTful serta autentikasi JWT.

---

## 🚀 Live API

🔗 Base URL: https://your-backend-url.vercel.app/api

> API ini dideploy menggunakan Vercel Serverless Functions.

---

# 🎯 Tujuan Project

Backend ini dibuat untuk:

- Mengelola sistem antrean pesanan secara terstruktur
- Menerapkan RESTful API design
- Mengimplementasikan JWT Authentication
- Role-based access control (Admin & User)
- Integrasi notifikasi WhatsApp

---

# 🌟 Fitur Utama

## 🧾 Order Management

- ✅ Membuat pesanan
- ✅ Melihat daftar pesanan
- ✅ Update status pesanan
- ✅ Tracking berdasarkan user
- ✅ Real-time ready (bisa dikembangkan dengan WebSocket)

---

## 🔐 Authentication & Authorization

- ✅ Register & Login
- ✅ JWT Access Token
- ✅ Protected Routes
- ✅ Role-based Access Control:
  - Admin → Kelola semua pesanan
  - User → Hanya lihat pesanan miliknya

---

## 📲 WhatsApp Integration

- ✅ Generate link WhatsApp otomatis
- ✅ Bisa dikembangkan dengan WhatsApp Gateway API
- ✅ Notifikasi status pesanan

---

# 🛠️ Tech Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JSON Web Token (JWT) |
| Security | Bcrypt |
| Deployment | Vercel Serverless |

---

# 📁 Struktur Folder

```
src/
│
├── controllers/     # Logic handler
├── models/          # Schema Mongoose
├── routes/          # API routes
├── middlewares/     # Auth & error handling
├── config/          # Database config
└── server.js
```

---

# ⚙️ Environment Variables

Buat file `.env` di root project:

```env
PORT=5000
MONGO_URI=isi_dengan_url_mongodb_atlas
JWT_SECRET=rahasia_dapur_anda
CLIENT_URL=http://localhost:5173
```

Keterangan:

- `MONGO_URI` → URL MongoDB Atlas
- `JWT_SECRET` → Secret key untuk token
- `CLIENT_URL` → URL frontend untuk CORS

---

# 📦 Instalasi Lokal

## 1️⃣ Clone Repository

```bash
git clone https://github.com/username/kedai-digital-api.git
cd kedai-digital-api
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Jalankan Server

Mode development:

```bash
npm run dev
```

Mode production:

```bash
npm start
```

Server akan berjalan di:

```
http://localhost:5000
```

---

# 🔌 API Endpoints

## 🔐 Auth

```
POST    /api/auth/register
POST    /api/auth/login
```

---

## 🧾 Orders

```
GET     /api/orders              (Admin)
POST    /api/orders              (User)
GET     /api/orders/user/:id     (User)
PATCH   /api/orders/:id          (Admin)
DELETE  /api/orders/:id          (Admin)
```

---

# 🔄 Status Workflow

```
Pending → Diproses → Siap Ambil → Selesai
                     ↓
                 Dibatalkan
```

Alur status dikontrol oleh Admin untuk menjaga sistem antrean tetap rapi dan sistematis.

---

# 🔒 Security Implementation

- Password hashing menggunakan bcrypt
- JWT token expiration
- Middleware authentication
- Role-based route protection
- CORS configuration

---

# 🗄️ Database Schema (Simplified)

## User

```javascript
{
  name: String,
  email: String,
  password: String,
  role: "admin" | "user"
}
```

## Order

```javascript
{
  user: ObjectId,
  items: Array,
  totalPrice: Number,
  status: String,
  createdAt: Date
}
```

---

# ☁️ Deployment (Vercel)

Project ini menggunakan:

- Serverless Functions
- Environment Variables di dashboard Vercel
- MongoDB Atlas sebagai cloud database

Pastikan:

- Whitelist IP Vercel di MongoDB Atlas
- Environment variables sudah di-set di Vercel

---

# 🧠 Konsep yang Diimplementasikan

- RESTful API Architecture
- MVC Pattern
- Middleware Pattern
- JWT Authentication
- Role-based Access Control
- Production Deployment (Serverless)

---

# 👨‍💻 Author

**Zidan**  
Backend Developer (Node.js & Express)

---

# ⭐ Future Improvements

- 🔄 WebSocket untuk real-time update
- 📊 Dashboard analytics
- 📦 Multi-outlet system
- 🔔 Push notification service
- 🧪 Unit & Integration Testing (Jest)

---