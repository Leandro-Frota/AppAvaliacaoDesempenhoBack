import express from "express";
import AuthController from "../controller/authController.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register-user", AuthController.registerUser);

export default router;
