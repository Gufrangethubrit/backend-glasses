import express from "express"
import { getSettings, updateSettings } from "../controller/settingsController.js"
import AdminAuth from "../middleware/AdminAuth.js"

const settingsRoutes = express.Router()

settingsRoutes.get("/", getSettings)
settingsRoutes.put("/", AdminAuth, updateSettings)

export default settingsRoutes
