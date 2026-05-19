import Settings from "../model/settingsModel.js"

const editableFields = [
  "storeName",
  "description",
  "addressLine1",
  "addressLine2",
  "phonePrimary",
  "phoneSecondary",
  "whatsapp",
  "email",
  "instagram",
  "facebook",
  "youtube",
  "twitter",
  "mapEmbedUrl",
  "consultantName",
  "consultantTitle",
]

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne({})
  if (!settings) settings = await Settings.create({})
  return settings
}

export const getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings()
    return res.status(200).json(settings)
  } catch (error) {
    console.log("Get Settings Error:", error.message)
    return res.status(500).json({ message: error.message })
  }
}

export const updateSettings = async (req, res) => {
  try {
    const payload = {}

    editableFields.forEach(field => {
      if (req.body[field] !== undefined) payload[field] = req.body[field]
    })

    const settings = await getOrCreateSettings()
    const updated = await Settings.findByIdAndUpdate(settings._id, payload, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json({ message: "Settings updated successfully", settings: updated })
  } catch (error) {
    console.log("Update Settings Error:", error.message)
    return res.status(500).json({ message: error.message })
  }
}
