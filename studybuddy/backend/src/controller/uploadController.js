const Material = require("../models/Material");

// Upload Study Material
const uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const material = await Material.create({
      user: req.user.id,
      title: req.file.originalname,
      content: "Uploaded file",
      fileUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Study material uploaded successfully",
      material,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload study material",
      error: error.message,
    });
  }
};

module.exports = {
  uploadMaterial,
};