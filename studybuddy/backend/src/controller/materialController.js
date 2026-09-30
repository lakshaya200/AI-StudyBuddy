const Material = require("../models/Material");

// Add Study Material
const addMaterial = async (req, res) => {
  try {
    const { title, content } = req.body;

    const material = await Material.create({
      user: req.user.id,
      title,
      content,
    });

    res.status(201).json({
      message: "Study material added successfully",
      material,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add study material",
      error: error.message,
    });
  }
};

// Get User Materials
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({
      user: req.user.id,
    });

    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch study materials",
      error: error.message,
    });
  }
};

module.exports = {
  addMaterial,
  getMaterials,
};