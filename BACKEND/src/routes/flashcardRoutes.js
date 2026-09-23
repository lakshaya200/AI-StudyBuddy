const express = require("express");

const {
  generateFlashcards,
} = require("../controllers/flashcardController");

const protect = require("../middleware/auth");

const router = express.Router();

router.post("/generate", protect, generateFlashcards);

module.exports = router;