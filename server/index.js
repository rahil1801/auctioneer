require('dotenv').config();
const PORT = process.env.PORT || 4000;

const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/Auth');
const auctionRoutes = require('./routes/Auction');

const setupSocket = require('./socket/socket');

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auction', auctionRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
