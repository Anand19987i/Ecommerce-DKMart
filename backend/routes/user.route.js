import express from "express";
import { singleUpload } from "../middlewares/multer.js"
import { adminLogin, fetchAllUsers, fetchUserDetails, loginWithEmail, logout, register, sendOtp, userDetails, verifyOtp } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/signup").post(register);
router.route("/login").post(loginWithEmail);
router.route("/edit/:name/:id").post(singleUpload, userDetails)
router.route("/profile/:name/:id").get(fetchUserDetails)
router.route("/get/users").get(fetchAllUsers);
router.route("/logout").get(logout);
router.route('/admin').post(adminLogin);
router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);

export default router;