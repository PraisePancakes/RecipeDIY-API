const User = require("../../Models/User");
const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId);
    const postIds = user.savedPosts;
    const savedPosts = await Post.find({ _id: postIds }).populate({
      path: "author",
      select: "-password ",
    });

    return res.status(200).send({ savedPosts });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
