const Material = require("../models/Material");
const StudyPlan = require("../models/StudyPlan");
const ai = require("../utils/gemini");

// Generate AI Study Plan
const generateStudyPlan = async (req, res) => {
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
Create a simple and practical study plan for a college student based on the following study material.

Include:
- Topics to study
- Recommended study order
- Daily study tasks
- Revision points
- Practice suggestions

Keep the plan clear and easy to follow.

Title: ${material.title}

Content:
${material.content}
`;

    let response;

try {
  response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });
} catch (aiError) {
  return res.status(503).json({
    message: "AI service is temporarily unavailable. Please try again later.",
  });
}

    const planText = response.text;

    const studyPlan = await StudyPlan.create({
      user: req.user.id,
      material: material._id,
      plan: planText,
    });

    res.status(201).json({
      message: "AI study plan generated successfully",
      studyPlan,
    });
    } catch (error) {
    console.error("STUDY PLAN ERROR:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI quota exceeded. Please try again later.",
      });
    }

    res.status(500).json({
      message: "Failed to generate AI study plan",
      error: error.message,
    });
  }
};

module.exports = {
  generateStudyPlan,
};