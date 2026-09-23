const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/utils/db");
const authRoutes = require("./src/routes/authRoutes");
const materialRoutes = require("./src/routes/materialRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const summaryRoutes = require("./src/routes/summaryRoutes");
const flashcardRoutes = require("./src/routes/flashcardRoutes");
const quizRoutes = require("./src/routes/quizRoutes");
const studyPlanRoutes = require("./src/routes/studyPlanRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/study-plan", studyPlanRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("AI StudyBuddy Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});