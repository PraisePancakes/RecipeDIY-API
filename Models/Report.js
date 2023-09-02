const mongoose = require("mongoose");

const reportTypes = ["NUDITY", "HARRASSMENT", "ADVERTISEMENT", "SCAM/PHISHING"];
const ReportSchema = new mongoose.Schema(
  {
    postAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postReporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    reason: { type: String, required: true, min: 3, max: 50 },
    reportType: { type: String, enum: reportTypes, required: true },
  },
  {
    timestamps: true,
  }
);

var Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
