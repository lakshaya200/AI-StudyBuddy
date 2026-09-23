const express = require("express");

const {
  generateStudyPlan,
} = require("../controllers/studyPlanController");

const protect = require("../middleware/auth");

const router = express.Router();

router.post("/generate", protect, generateStudyPlan);

module.exports = router;