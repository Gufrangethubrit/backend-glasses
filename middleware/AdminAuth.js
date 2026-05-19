import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        // Accept token from cookie OR Authorization header (Bearer token)
        let token = req.cookies?.token

        if (!token) {
            const authHeader = req.headers['authorization']
            if (authHeader?.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1]
            }
        }

        if (!token) return res.status(401).json({ message: "Admin token missing" })

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!verifyToken) return res.status(401).json({ message: "Admin token invalid" })

        req.adminEmail = process.env.ADMIN_EMAIL
        next()

    } catch (error) {
        console.log("AdminAuth error:", error.message)
        return res.status(401).json({ message: "Admin authentication failed" })
    }
}

export default adminAuth
