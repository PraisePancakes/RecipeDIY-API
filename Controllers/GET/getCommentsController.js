const Post = require("../../Models/Post");
const User = require("../../Models/User");

module.exports = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({ message: "Post Not Found" });
    }

    const comments = post.comments;

    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
