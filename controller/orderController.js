import Order from "../model/orderModel.js"
import User from "../model/userModel.js"

// ── Razorpay (commented out — enable when keys are ready) ──
// import razorpay from "razorpay"
// const currency = "inr"
// const razorpayInstance = new razorpay({
//     key_id:     process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body
        const userId = req.userId
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()
        await User.findByIdAndUpdate(userId, { cartData: {} })
        return res.status(201).json({ message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Order Place error' })
    }
}

export const placeOrderRazorpay = async (req, res) => {
    // TODO: Uncomment razorpay instance above when keys are ready
    return res.status(503).json({ message: "Razorpay payment is temporarily disabled" })
}

export const verifyRazorpay = async (req, res) => {
    // TODO: Uncomment razorpay instance above when keys are ready
    return res.status(503).json({ message: "Razorpay verification is temporarily disabled" })
}

export const userOrder = async (req, res) => {
    try {
        const userId = req.userId
        const orders = await Order.find({ userId })
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "userOrders error" })
    }
}

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "adminAllOrders error" })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        if (!orderId || !status) {
            return res.status(400).json({ message: "orderId and status are required" })
        }
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
        if (!order) return res.status(404).json({ message: "Order not found" })
        return res.status(200).json({ message: "Status Updated", order })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
