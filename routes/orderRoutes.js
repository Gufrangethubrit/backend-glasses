import express from "express"
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrder, verifyRazorpay } from "../controller/orderController.js"
import AdminAuth from '../middleware/AdminAuth.js'

let orderRoutes = express.Router()

// ── User routes ──
orderRoutes.post("/placeorder",      isAuth,    placeOrder          )
orderRoutes.post("/razorpay",        isAuth,    placeOrderRazorpay  )
orderRoutes.post("/userorder",       isAuth,    userOrder           )
orderRoutes.post("/verifyrazorpay",  isAuth,    verifyRazorpay      )

// ── Admin routes ──
orderRoutes.post("/list",            AdminAuth, allOrders           )
orderRoutes.put("/update-status",    AdminAuth, updateStatus        )  // fixed: was duplicate /verifyrazorpay

export default orderRoutes
