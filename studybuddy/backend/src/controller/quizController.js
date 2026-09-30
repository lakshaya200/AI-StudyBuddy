const Material = require("../models/Material");
const Quiz = require("../models/Quiz");
const ai = require("../utils/gemini");

// Generate AI Quiz
const generateQuiz = async (req, res) => {
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
Create 5 multiple-choice quiz questions from the following study material.

Return ONLY a JSON array in this exact format:
[
  {
    "question": "Question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "Correct option here"
  }
]

Title: ${material.title}

Content:
${material.content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    let quizText = response.text.trim();

    quizText = quizText
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "");

    const quizData = JSON.parse(quizText);

    const savedQuiz = await Quiz.insertMany(
      quizData.map((quiz) => ({
        user: req.user.id,
        material: material._id,
        question: quiz.question,
        options: quiz.options,
        correctAnswer: quiz.correctAnswer,
      }))
    );

    res.status(201).json({
      message: "AI quiz generated successfully",
      quiz: savedQuiz,
    });
  } catch (error) {
    console.error("QUIZ ERROR:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI quota exceeded. Please try again later.",
      });
    }

    res.status(500).json({
      message: "Failed to generate AI quiz",
      error: error.message,
    });
  }
};

module.exports = {
  generateQuiz,
};