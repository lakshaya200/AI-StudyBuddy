const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/utils/db");

const app = express();

const authRoutes = require("./src/routes/authRoutes");
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("AI StudyBuddy Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});