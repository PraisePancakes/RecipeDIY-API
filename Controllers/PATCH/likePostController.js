const Post = require("../../Models/Post");
const User = require("../../Models/User");
//patch req
module.exports = async (req, res) => {
  const { postId } = req.params;
  const userId = req.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (post.likes.some((like) => like.user.equals(userId))) {
      post.likes = post.likes.filter((like) => !like.user.equals(userId));
      await post.save();
      return res.status(200).send({ message: "You Unliked This Post" });
    }
    post.likes.push({ user: userId });
    await post.save();

    return res.status(200).send({ message: "You Liked This Post" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
