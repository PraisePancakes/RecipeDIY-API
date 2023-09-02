const mongoose = require("mongoose");
require("./User");

const difficultyLevels = ["EASY", "INTERMEDIATE", "HARD", "MICHELIN"];
const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userDetails: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, min: 3, max: 50, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ingredients: {
      type: [String],
      validate: [arrayLimit, "0 indexed ingredients error"],
      required: true,
    },
    steps: {
      type: [String],
      validate: [arrayLimit, "0 indexed steps error"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: difficultyLevels,
      required: true,
    },
    postImageURL: {
      type: String,
      default: "",
    },
    likes: [LikeSchema],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length >= 1;
}

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
