const Post = require("../../Models/Post");
const path = require("path");
const fs = require("fs");
const User = require("../../Models/User");

module.exports = async (req, res) => {
  const { postId } = req.params;
  const userId = req.id;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (post.author.toString() !== userId && !user.isAdmin) {
      return res.status(400).send({ message: "Unauthorized" });
    }

    const postImagePath = path.join(
      __dirname,
      "../../Post_Mult_Images",
      post.postImageURL
    );
    fs.unlink(postImagePath, (err) => {
      if (err) {
        console.error("Error deleting post image:", err);
      } else {
        console.log("Post image deleted");
      }
    });

    await post.deleteOne();
    return res.status(200).send({ message: "Deleted Post" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
