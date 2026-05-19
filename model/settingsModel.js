import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema({
  storeName: { type: String, default: "EyeMax Eyecare" },
  description: {
    type: String,
    default: "Elevate your everyday vision with premium crafted glasses, blending timeless elegance and modern design.",
  },
  addressLine1: { type: String, default: "Belthra Marg, Near Power House" },
  addressLine2: { type: String, default: "Nagra - Ballia" },
  phonePrimary: { type: String, default: "8787241227" },
  phoneSecondary: { type: String, default: "7905492433" },
  whatsapp: { type: String, default: "918787241227" },
  email: { type: String, default: "eyemaxnagra@gmail.com" },
  instagram: {
    type: String,
    default: "https://www.instagram.com/eyemax2023?igsh=MTZpdDRxbnVweXJqMw==",
  },
  facebook: {
    type: String,
    default: "https://www.facebook.com/people/Eyemax-Eyecare/pfbid0xJv4bcCmpGoxAHcdnRt8NtLemChwG5jtctXHVxGGF913k1mQamjphznffP1oYWyrl/",
  },
  youtube: { type: String, default: "" },
  twitter: { type: String, default: "" },
  mapEmbedUrl: { type: String, default: "" },
  consultantName: { type: String, default: "Dr. Manish Kumar" },
  consultantTitle: { type: String, default: "(B.OPTM) MAKAUT WEST BENGAL" },
}, { timestamps: true })

const Settings = mongoose.model("Settings", settingsSchema)

export default Settings
