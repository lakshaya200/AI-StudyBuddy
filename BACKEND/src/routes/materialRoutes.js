const express = require("express");

const {
  addMaterial,
  getMaterials,
} = require("../controllers/materialController");

const protect = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, addMaterial);
router.get("/", protect, getMaterials);

module.exports = router;