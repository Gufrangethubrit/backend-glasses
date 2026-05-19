import Order from "../model/orderModel.js"
import Product from "../model/productModel.js"
import User from "../model/userModel.js"

const startOfToday = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export const getDashboardStats = async (req, res) => {
  try {
    const [products, orders, users] = await Promise.all([
      Product.find({}).lean(),
      Order.find({}).sort({ date: -1 }).lean(),
      User.find({}).select("name email createdAt").lean(),
    ])

    const userMap = new Map(users.map(user => [String(user._id), user]))
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount || 0), 0)
    const todayStart = startOfToday()
    const todayOrders = orders.filter(order => Number(order.date || 0) >= todayStart)
    const pendingOrders = orders.filter(order => ["Order Placed", "Processing"].includes(order.status))
    const deliveredOrders = orders.filter(order => order.status === "Delivered")
    const activeProducts = products.filter(product => product.isActive !== false)
    const inactiveProducts = products.filter(product => product.isActive === false || product.inStock === false)

    const recentOrders = orders.slice(0, 6).map(order => {
      const user = userMap.get(String(order.userId))
      return {
        _id: order._id,
        customer: user?.name || user?.email || "Customer",
        amount: order.amount || 0,
        status: order.status || "Order Placed",
        paymentMethod: order.paymentMethod || "COD",
        date: order.date,
        itemsCount: order.items?.length || 0,
      }
    })

    return res.status(200).json({
      totalRevenue,
      productCount: products.length,
      activeProductCount: activeProducts.length,
      inactiveProductCount: inactiveProducts.length,
      orderCount: orders.length,
      pendingOrderCount: pendingOrders.length,
      deliveredOrderCount: deliveredOrders.length,
      todayOrderCount: todayOrders.length,
      todayRevenue: todayOrders.reduce((sum, order) => sum + Number(order.amount || 0), 0),
      userCount: users.length,
      recentOrders,
    })
  } catch (error) {
    console.log("Dashboard Stats Error:", error.message)
    return res.status(500).json({ message: error.message })
  }
}
