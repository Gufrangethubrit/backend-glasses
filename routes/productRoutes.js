import express from 'express'
import AdminAuth from '../middleware/AdminAuth.js'
import { createProduct, productList, removeProduct, updateProduct } from '../controller/productController.js'
import upload from '../middleware/multer.js'

let productRoutes = express.Router()

const imageUpload = upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
])

productRoutes.post("/add-product",          imageUpload, AdminAuth, createProduct)
productRoutes.get("/list-products",                                  productList)
productRoutes.delete("/list-products/:id",               AdminAuth, removeProduct)
productRoutes.put("/update-product/:id",    imageUpload, AdminAuth, updateProduct)

export default productRoutes
