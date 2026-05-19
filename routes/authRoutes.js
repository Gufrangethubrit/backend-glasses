import express from "express";
import { adminLogin, googleLogin, login, logout, register } from "../controller/authController.js";

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post("/login", login)
authRoutes.get("/logout", logout)
authRoutes.post("/google-login", googleLogin)
authRoutes.post("/admin-login", adminLogin)

export default authRoutes;