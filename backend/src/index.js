import dotenv from "dotenv";
import http from "http";
import db_connect from "./db/db.js";
import { app } from "./app.js";
import { initSocket } from "./server.js";

dotenv.config({
    path: './.env'
});

const server = http.createServer(app);

initSocket(server);

db_connect()
    .then(() => {

        server.listen(process.env.PORT || 3000, () => {

            console.log(`Server running on ${process.env.PORT || 3000}`);

        });

    })
    .catch((error) => {

        console.log("Database failed to connect",error);

    });