import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

const initSocket = (server) => {

    const allowedOrigins = [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://nearbyservice24.netlify.app"
    ];

    io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("User Connected");

        socket.on("join_room", (userId) => {
            socket.join(userId);
            onlineUsers.set(socket.id, userId);
            console.log(`Joined room ${userId}`);
        });

        socket.on("disconnect", () => {
            const userId = onlineUsers.get(socket.id);
            onlineUsers.delete(socket.id);
            console.log(`${userId} is offline`);
        });
    });
};

const getIO = () => io;

export { initSocket, getIO };