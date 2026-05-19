import { Router } from "express";
import { acceptBooking, createBooking } from "../controllers/booking.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { compleate_service } from "../controllers/booking.controller.js";


const router = Router()

router.route("/create").post(jwtVerify,createBooking)
router.route("/accept/:_id").post(jwtVerify,acceptBooking)
router.route("/compleate/:_id").post(jwtVerify,compleate_service)

export default router