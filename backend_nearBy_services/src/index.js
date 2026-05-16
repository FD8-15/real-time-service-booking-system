import dotenv from "dotenv";
import http from "https"
import db_connect from "./db/db.js";
import { app } from "./app.js";

// import { Server } from "socket.io";
// import { Socket } from "dgram";

// ✅ Load env FIRST
dotenv.config({
    path: './.env'
})

// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: "http://127.0.0.1:5500",
//         credentials: true
//     }
// });
// io.on("connection", (socket) => {

//     console.log("User connected");
//     console.log(socket.id);

//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//     });

// });
db_connect()
    .then(() => {

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on ${process.env.PORT || 3000}`);
        });

    })
    .catch((error) => {
        console.log("Database failed to connect");
    });