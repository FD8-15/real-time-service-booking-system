import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { login, userRegister } from "../controllers/user.controller.js"

const router = Router();

router.route("/register").post(upload.fields([{ name: "profileImg", maxCount: 1 }]), userRegister)
console.log("User routes loaded");

router.route("/login").post(login)
export default router;