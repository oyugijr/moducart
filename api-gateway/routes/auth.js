import express from "express";
import { loginPage, registerPage, handleLogin } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", loginPage);
router.get("/register", registerPage);
router.post("/login", handleLogin);

export default router;
