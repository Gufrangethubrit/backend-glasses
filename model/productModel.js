import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // ── Basic Info ──
  name:        { type: String,  required: true },
  brand:       { type: String,  default: '' },
  sku:         { type: String,  default: '' },
  description: { type: String,  required: true },
  badge:       { type: String,  default: 'None' },  // None | New | Sale | Best Seller | Limited Edition

  // ── Images ──
  image1: { type: String, required: true },
  image2: { type: String, default: '' },
  image3: { type: String, default: '' },
  image4: { type: String, default: '' },

  // ── Categorization ──
  gender:        { type: [String], default: [] },   // ['Men','Women','Kids']
  category:      { type: String,   required: true }, // Sunglasses | Eyeglasses
  frameMaterial: { type: String,   default: '' },    // Metal | Acetate | TR90 | Titanium
  frameShape:    { type: String,   default: '' },    // Aviator | Round | Rectangle ...

  // ── Pricing ──
  price:    { type: Number, required: true },
  oldPrice: { type: Number, default: null },         // MRP for strikethrough

  // ── Variants ──
  sizes:  { type: [String], default: [] },           // ['Small','Medium','Large']
  colors: { type: Array,    default: [] },           // [{name:'Gold', hex:'#C0A060'}]

  // ── Ratings ──
  rating:  { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },

  // ── Features & Specs ──
  features: { type: [String], default: [] },
  specs:    { type: Array,    default: [] },         // [{label:'Lens Width', value:'58mm'}]

  // ── Status ──
  bestseller: { type: Boolean, default: false },     // isFeatured
  isActive:   { type: Boolean, default: true },
  inStock:    { type: Boolean, default: true },

  // ── Meta ──
  date: { type: Number, required: true },

}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product
