const mongoose = require("mongoose");

// Schema for questions
module.exports = mongoose.Schema(
  {
    // define the relevant properties.
    title: { type: String },
    text: { type: String },
    asked_by: { type: String },
    ask_date_time: { type: Date },
    views: { type: Number, default: 0 },
    answers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "fake_so", required: true },
    ],
    tags: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
    ],
    votes: { type: Number, default: 0 },
    reportedBy: {type: [String], default:[]}
  },
  { collection: "Question" }
);
