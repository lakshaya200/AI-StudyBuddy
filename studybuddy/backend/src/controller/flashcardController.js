const Material = require("../models/Material");
const Flashcard = require("../models/Flashcard");
const ai = require("../utils/gemini");

// Generate AI Flashcards
const generateFlashcards = async (req, res) => {
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
Create 5 useful study flashcards from the following study material.

Return the answer ONLY as a JSON array in this format:
[
  {
    "question": "Question here",
    "answer": "Answer here"
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

    let flashcardsText = response.text.trim();

    flashcardsText = flashcardsText
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "");

    const flashcardsData = JSON.parse(flashcardsText);

    const savedFlashcards = await Flashcard.insertMany(
      flashcardsData.map((card) => ({
        user: req.user.id,
        material: material._id,
        question: card.question,
        answer: card.answer,
      }))
    );

    res.status(201).json({
      message: "AI flashcards generated successfully",
      flashcards: savedFlashcards,
    });
  res.status(201).json({
      message: "AI flashcards generated successfully",
      flashcards: savedFlashcards,
    });

  } catch (error) {
    console.error("FLASHCARD ERROR:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI quota exceeded. Please try again later.",
      });
    }

    res.status(500).json({
      message: "Failed to generate AI flashcards",
      error: error.message,
    });
  }
};

module.exports = {
  generateFlashcards,
};

module.exports = {
  generateFlashcards,
};