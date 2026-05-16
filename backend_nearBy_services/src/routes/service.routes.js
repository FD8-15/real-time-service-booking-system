import { Router } from "express";
import { createService } from "../controllers/service.controller.js";
import { getService } from "../controllers/service.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(jwtVerify,createService)
router.route("/get").post(getService)

export default router;