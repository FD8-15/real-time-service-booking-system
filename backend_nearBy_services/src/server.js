import { Server } from "socket.io";
let io;
const onlineUsers = new Map();

const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "http://127.0.0.1:5500",
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("User Connected");

        socket.on("join_room", (userId) => {
            socket.join(userId);
            onlineUsers.set(socket.id, userId);
            console.log(`Joined room ${userId}`);
            console.log(`${userId} is online`);
        });

        socket.on("disconnect", () => {
            const userId = onlineUsers.get(socket.id);
            onlineUsers.delete(socket.id);
            console.log(`${userId} is offline`);
            console.log("User disconnected");
        });
    });
};

const getIO = () => {
    return io;
};

export { initSocket, getIO };