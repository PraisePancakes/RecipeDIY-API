const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post Not Found" });
    }

    const likes = post.likes;

    return res.status(200).send(likes);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
