const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },

    plan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyPlan", studyPlanSchema);