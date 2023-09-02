const User = require("../../Models/User");
const Post = require("../../Models/Post");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  const userId = req.id;
  const { username, password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username !== user.username) {
      return res.status(404).json({ error: "Invalid Username" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (user.profileImgURL !== "") {
      const previousImagePath = path.join(
        __dirname,
        "../../User_Mult_Images",
        user.profileImgURL
      );
      fs.unlink(previousImagePath, (err) => {
        if (err) {
          console.error("Error deleting previous profile picture:", err);
        } else {
          console.log("Previous profile picture deleted");
        }
      });
    }
    const userPosts = await Post.find({ author: userId });

    for (const post of userPosts) {
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
    }

    await User.findByIdAndDelete(userId);
    await Post.deleteMany({ author: userId });

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
