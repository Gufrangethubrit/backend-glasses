import User from "../model/userModel.js"
import Product from "../model/productModel.js"

/* ── Add to Cart ── */
export const cartAdd = async (req, res) => {
    try {
        const { productId, size } = req.body

        const userData = await User.findById(req.userId)
        if (!userData) return res.status(404).json({ message: "User not found" })

        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({ message: "Product not found" })

        let cartData = userData.cartData || {}

        if (cartData[productId]) {
            if (cartData[productId][size]) {
                cartData[productId][size] += 1
            } else {
                cartData[productId][size] = 1
            }
        } else {
            cartData[productId] = {}
            cartData[productId][size] = 1
        }

        await User.findByIdAndUpdate(req.userId, { cartData })
        return res.status(200).json({ message: "Product added to cart successfully", cartData })

    } catch (error) {
        console.log("Add to Cart Error:", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

/* ── Update Cart ── */
export const cartUpdate = async (req, res) => {
    try {
        const { productId, size, quantity } = req.body

        const userData = await User.findById(req.userId)
        if (!userData) return res.status(404).json({ message: "User not found" })

        let cartData = userData.cartData || {}

        if (!cartData[productId]) {
            return res.status(400).json({ message: "Product not in cart" })
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            delete cartData[productId][size]
            if (Object.keys(cartData[productId]).length === 0) {
                delete cartData[productId]
            }
        } else {
            cartData[productId][size] = quantity
        }

        await User.findByIdAndUpdate(req.userId, { cartData })
        return res.status(200).json({ message: "Cart updated successfully", cartData })

    } catch (error) {
        console.log("Cart Update Error:", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

/* ── Get User Cart ── */
export const getUserCart = async (req, res) => {
    try {
        const userData = await User.findById(req.userId)
        if (!userData) return res.status(404).json({ message: "User not found" })

        return res.status(200).json({ cartData: userData.cartData || {} })

    } catch (error) {
        console.log("Get Cart Error:", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
