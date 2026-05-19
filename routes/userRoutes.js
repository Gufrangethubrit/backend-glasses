import express from "express";
import isAuth  from "../middleware/isAuth.js";
import { getAdmin, getUser } from "../controller/userController.js";
import adminAuth from "../middleware/AdminAuth.js";


let userRoutes = express.Router()

userRoutes.get("/getuser",isAuth, getUser)
userRoutes.get("/getadmin",adminAuth, getAdmin)

export default userRoutes