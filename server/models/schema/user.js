const mongoose = require("mongoose");

module.exports = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userFullName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPhoneNumber: {
      type: String,
      required: true,
    },
    userSummary: {
      type: String,
    },
    userProfilePicPath: {
      type: String,
    },
    userUpVotedQuestion: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
      default: [],
    },
    userDownVotedQuestion: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
      default: [],
    },
  },
  { collection: "users" }
);
