import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
import userRoutes from "./routes/user.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js"

app.use("/api/users", userRoutes);
app.use("/api/service",serviceRoutes);
app.use("/api/booking",bookingRoutes);

export  {app};

