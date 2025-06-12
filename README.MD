# 📦 Backend API - RentKaro (Node.js + Express + MongoDB)

This is the backend API for **RentKaro**, a platform where users can list and rent products. Built using **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- User Authentication (Login / Signup)
- JWT-based session handling
- Product listing and search
- Wishlist (Like system)
- Chat system
- Image uploads (Cloudinary/Local)
- Role-based routes (optional)
- Responsive API for frontend clients

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT + Cookies
- **File Uploads**: Multer (optionally Cloudinary)
- **Deployment**: Render.com

---

## 📁 Project Structure

```
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── .env
├── server.js / index.js
├── package.json
└── README.md
```

---

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/rentkaro-backend.git
cd rentkaro-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Run the app**
```bash
npm start
```

The server will be running on `http://localhost:5000`

---

## 📡 API Endpoints

### 🔐 Auth
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/logout
```

### 📦 Products
```
GET    /api/v1/products
POST   /api/v1/products/create
GET    /api/v1/products/:id
DELETE /api/v1/products/:id
```

### ❤️ Wishlist
```
POST   /api/v1/wishlist/:productId
GET    /api/v1/wishlist
```

### 💬 Chat
```
GET    /api/v1/messages/:userId
POST   /api/v1/messages/send
```

> 📌 *More endpoints are available depending on your feature set.*

---

## 🧪 Test API Locally

Use **Postman** or **Thunder Client** to test API routes.

---

## 🚀 Deployment on Render

1. Push your code to GitHub
2. Go to [https://render.com](https://render.com)
3. Create a new **Web Service**
4. Select your repo
5. Set build and start commands:
   - **Build**: `npm install`
   - **Start**: `npm start`
6. Add environment variables:
   ```
   PORT=10000
   MONGO_URI=your_atlas_uri
   JWT_SECRET=your_secret
   ```

> Make sure to allow dynamic ports:
```js
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## ✅ To Do (optional)

- [ ] Rate limiting
- [ ] Admin dashboard
- [ ] OTP-based login
- [ ] File storage in S3/Cloudinary
- [ ] Testing with Jest

---

## 👨‍💻 Author

**Rajesh Kumar Singh**  
📧 rk6522484@gmail.com  