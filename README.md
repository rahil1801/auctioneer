# 🛒 Auctioneer - A Online Auction Platform

An advanced **MERN Stack** application for hosting and participating in online auctions, with **real-time bidding** powered by **Socket.io**.  
Users can create auctions, place bids, track live bid updates, and manage their auctioned products — all in a smooth, interactive interface.

---

## 🌐 Live Demo
https://auctioneer-client.vercel.app/

---

## 📖 Overview
The **Online Auction Platform** is designed to replicate real-world auction systems where multiple participants can bid on items in **real-time**.  
It ensures instant updates, fair bidding, and seamless auction management.

The system includes:
- Real-time bid synchronization using WebSockets
- Auction status tracking (Active, Expired)
- Automatic winner assignment when the auction ends
- User authentication & authorization using Firebase Authentication
- Secure CRUD operations for products and bids

---

## ✨ Features

### 👤 User Features
- **Sign Up / Login** (JWT authentication with httpOnly cookies)
- **Sign Up / Login using Google** (Authentication using Firebase Authentication)
- **Browse Auctions** – View available products for bidding
- **Place Bids in Real-Time** – Compete with others instantly
- **View Bid History** – Track offers made
- **Profile Management** – Update personal details

### 🛍 Seller Features
- **Create Auctions** – Upload product images, set starting price & auction duration
- **Edit / Delete Auctions** – Modify product details before bidding starts
- **Track Live Bids** – See highest bidder in real-time
- **Automatic Auction Closure** – System marks auction as expired when time runs out

### 🔄 Real-Time Features
- **Instant Bid Updates** – No page refresh needed
- **Live Auction Status** – "Active", "Expired", "Sold"
- **Winner Declaration** – Highest bidder assigned automatically

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Redux Toolkit (State Management)
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io (Real-Time Communication)
- Cloudinary (for product images)

**Deployment:**
- **Frontend:** Vercel
- **Backend:** Vercel
- **Database:** MongoDB Compass

---

## 📸 Screenshots
<img width="1915" height="918" alt="A1" src="https://github.com/user-attachments/assets/2ce12c8e-7650-421a-b062-eaf2c1290a4b" />
<img width="1909" height="919" alt="A2" src="https://github.com/user-attachments/assets/6a8d0c5e-ce7d-4228-9909-b5dd8a359a4f" />
---

## ⚙️ Installation & Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rahil1801/auctioneer.git
cd client && npm install && npm run dev
cd server && npm install && npm run start
```
---

## 📖 Contributing
Pull requests are welcome. For significant changes, please open an issue first to discuss what you’d like to change.
