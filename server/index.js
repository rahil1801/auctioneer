require('dotenv').config();
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/Auth');

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

connectDB();

//routes
app.use('/api/v1/auth', authRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
