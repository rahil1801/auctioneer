const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.headers.cookie.split('token=')[1];

        if(!token){
            return next(new Error("Authentication error"));
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            next();
        }
        catch(error){
            next(new Error("Authentication error"));
            console.log("ERROR IN SOCKET AUTHENTICATION: ", error);
        }
    });

    io.on('connection', (socket) => {
        console.log("User connected:", socket.user.email);
    });

    return io;
};

module.exports = setupSocket;