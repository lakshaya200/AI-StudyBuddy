const express = require("express");

const { uploadMaterial } = require("../controllers/uploadController");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/material",
  protect,
  upload.single("file"),
  uploadMaterial
);

module.exports = router;