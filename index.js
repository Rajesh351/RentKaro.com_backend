const express = require('express');
const dbconncet = require('./config/db');
const cookieParser = require('cookie-parser');
const userRoute = require("./route/userRoute")
const cors = require('cors');
require('dotenv').config();
const ProductsRoute = require("./route/Products")
const { Server } = require("socket.io");
const Message = require("./model/Message")
const http = require("http");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: [process.env.HOST, process.env.CLIENT_URL],
    credentials: true
}
app.use(cors(corsOptions));
const server = http.createServer(app);

// Initialize socket.io with the HTTP server
const io = new Server(server, {
    cors: {
        origin: [process.env.HOST, process.env.CLIENT_URL],
        methods: ["GET", "POST", "dELETE", "PUT"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});
dbconncet();
io.on('connection', (socket) => {
    socket.on('join', ({ userId }) => {
        socket.join(userId);
    });

    socket.on('send-message', async ({ sender, receiver, message }) => {
        const msg = new Message({ sender, receiver, message });
        await msg.save();

        // Send to receiver if online
        io.to(receiver).emit('receive-message', msg);

        // Optionally: send back to sender
        io.to(sender).emit('receive-message', msg);
    });

    socket.on('disconnect', () => {
    });
});
app.use("/api/v1", userRoute);
app.use("/api", ProductsRoute);

server.listen(process.env.PORT, () => {
});
