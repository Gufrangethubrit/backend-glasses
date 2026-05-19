import Product from "../model/productModel.js";
import uploadImageCloudinary from "../config/cloudinary.js";

/* ── helper: upload if file exists, else return fallback ── */
const uploadOrKeep = async (files, field, fallback = '') => {
  return files?.[field] ? await uploadImageCloudinary(files[field][0].path) : fallback
}

/* ══════════════════════════════════════
   CREATE PRODUCT
══════════════════════════════════════ */
export const createProduct = async (req, res) => {
  try {
    const {
      name, brand, sku, description, badge,
      gender, category, frameMaterial, frameShape,
      price, oldPrice,
      sizes, colors,
      rating, reviews,
      features, specs,
      bestseller, isActive, inStock,
    } = req.body

    // At least image1 is required
    if (!req.files?.image1) {
      return res.status(400).json({ message: "At least one product image is required." })
    }

    const image1 = await uploadImageCloudinary(req.files.image1[0].path)
    const image2 = await uploadOrKeep(req.files, 'image2')
    const image3 = await uploadOrKeep(req.files, 'image3')
    const image4 = await uploadOrKeep(req.files, 'image4')

    const productData = {
      name,
      brand:         brand         || '',
      sku:           sku           || '',
      description,
      badge:         badge         || 'None',
      image1, image2, image3, image4,
      gender:        gender        ? JSON.parse(gender)   : [],
      category,
      frameMaterial: frameMaterial || '',
      frameShape:    frameShape    || '',
      price:         Number(price),
      oldPrice:      oldPrice      ? Number(oldPrice) : null,
      sizes:         sizes         ? JSON.parse(sizes)    : [],
      colors:        colors        ? JSON.parse(colors)   : [],
      rating:        rating        ? Number(rating)  : 0,
      reviews:       reviews       ? Number(reviews) : 0,
      features:      features      ? JSON.parse(features) : [],
      specs:         specs         ? JSON.parse(specs)    : [],
      bestseller:    bestseller === 'true',
      isActive:      isActive  !== 'false',
      inStock:       inStock   !== 'false',
      date:          Date.now(),
    }

    const newProduct = await Product.create(productData)
    return res.status(201).json(newProduct)

  } catch (error) {
    console.log("Create Product Error:", error.message)
    res.status(500).json({ message: error.message })
  }
}

/* ══════════════════════════════════════
   LIST PRODUCTS
══════════════════════════════════════ */
export const productList = async (req, res) => {
  try {
    const products = await Product.find({})
    return res.status(200).json(products)
  } catch (error) {
    console.log("ProductList Error:", error.message)
    return res.status(500).json({ message: error.message })
  }
}

/* ══════════════════════════════════════
   REMOVE PRODUCT
══════════════════════════════════════ */
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    return res.status(200).json({ message: "Product removed successfully" })
  } catch (error) {
    console.log("Remove Product Error:", error.message)
    return res.status(500).json({ message: error.message })
  }
}

/* ══════════════════════════════════════
   UPDATE PRODUCT
══════════════════════════════════════ */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)
    if (!product) return res.status(404).json({ message: "Product not found" })

    const {
      name, brand, sku, description, badge,
      gender, category, frameMaterial, frameShape,
      price, oldPrice,
      sizes, colors,
      rating, reviews,
      features, specs,
      bestseller, isActive, inStock,
    } = req.body

    const image1 = await uploadOrKeep(req.files, 'image1', product.image1)
    const image2 = await uploadOrKeep(req.files, 'image2', product.image2)
    const image3 = await uploadOrKeep(req.files, 'image3', product.image3)
    const image4 = await uploadOrKeep(req.files, 'image4', product.image4)

    const updated = await Product.findByIdAndUpdate(id, {
      name:          name          || product.name,
      brand:         brand         ?? product.brand,
      sku:           sku           ?? product.sku,
      description:   description   || product.description,
      badge:         badge         ?? product.badge,
      image1, image2, image3, image4,
      gender:        gender        ? JSON.parse(gender)   : product.gender,
      category:      category      || product.category,
      frameMaterial: frameMaterial ?? product.frameMaterial,
      frameShape:    frameShape    ?? product.frameShape,
      price:         price         ? Number(price)        : product.price,
      oldPrice:      oldPrice !== undefined ? (oldPrice ? Number(oldPrice) : null) : product.oldPrice,
      sizes:         sizes         ? JSON.parse(sizes)    : product.sizes,
      colors:        colors        ? JSON.parse(colors)   : product.colors,
      rating:        rating        ? Number(rating)       : product.rating,
      reviews:       reviews       ? Number(reviews)      : product.reviews,
      features:      features      ? JSON.parse(features) : product.features,
      specs:         specs         ? JSON.parse(specs)    : product.specs,
      bestseller:    bestseller !== undefined ? bestseller === 'true' : product.bestseller,
      isActive:      isActive  !== undefined ? isActive  !== 'false' : product.isActive,
      inStock:       inStock   !== undefined ? inStock   !== 'false' : product.inStock,
    }, { new: true })

    return res.status(200).json({ message: "Product updated successfully", product: updated })

  } catch (error) {
    console.log("Update Product Error:", error.message)
    return res.status(500).json({ message: error.message })
  }
}
