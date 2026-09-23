const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
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

    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Summary", summarySchema);