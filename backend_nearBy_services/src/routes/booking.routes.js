import { Router } from "express";
import { acceptBooking, createBooking } from "../controllers/booking.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/create").post(jwtVerify,createBooking)
router.route("/accept/:_id").post(jwtVerify,acceptBooking)

export default router