const User = require("../../Models/User");
const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const posts = await Post.find({ author: userId });
    return res.status(200).send({ posts });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
