const Material = require("../models/Material");
const Summary = require("../models/Summary");
const ai = require("../utils/gemini");

// Generate AI Summary
const generateSummary = async (req, res) => {
  try {
    const { materialId } = req.body;

    const material = await Material.findOne({
      _id: materialId,
      user: req.user.id,
    });

    if (!material) {
      return res.status(404).json({
        message: "Study material not found",
      });
    }

    const prompt = `
Summarize the following study material in simple and clear points for a college student.

Title: ${material.title}

Content:
${material.content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const summaryText = response.text;

    const summary = await Summary.create({
      user: req.user.id,
      material: material._id,
      summary: summaryText,
    });

    res.status(201).json({
      message: "AI summary generated successfully",
      summary,
    });
  } catch (error) {
  console.error("SUMMARY ERROR:", error);

  if (error.status === 429) {
    return res.status(429).json({
      message: "AI quota exceeded. Please try again later.",
    });
  }

  res.status(500).json({
    message: "Failed to generate AI summary",
    error: error.message,
  });
}
};

module.exports = {
  generateSummary,
};