const express = require("express");
const ai = require("../utils/gemini");

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({
      message: "Gemini AI working successfully",
      response: response.text,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gemini AI request failed",
      error: error.message,
    });
  }
});

module.exports = router;