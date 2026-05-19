import express from "express"
import AdminAuth from "../middleware/AdminAuth.js"
import { getDashboardStats } from "../controller/adminController.js"

const adminRoutes = express.Router()

adminRoutes.get("/dashboard", AdminAuth, getDashboardStats)

export default adminRoutes
