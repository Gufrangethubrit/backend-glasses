import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express()

let PORT = process.env.PORT || 5000;

const normalizeOrigin = (value) => value?.trim().replace(/\/$/, '')

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  ...(process.env.ALLOWED_ORIGINS?.split(',') || []),
]
  .map(normalizeOrigin)
  .filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)

    const normalizedOrigin = normalizeOrigin(origin)

    // Allow any localhost port in development
    if (normalizedOrigin.startsWith('http://localhost')) return callback(null, true)
    if (normalizedOrigin.startsWith('http://127.0.0.1')) return callback(null, true)

    if (allowedOrigins.includes(normalizedOrigin)) return callback(null, true)

    callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Backend is live babu");
});

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/settings", settingsRoutes)
app.use("/api/admin", adminRoutes)




app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connectDB();
});

