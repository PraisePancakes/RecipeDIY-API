const User = require("../../Models/User");
const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .send({ message: "Post not found or no longer exists" });
    }
    const author = post.author;
    const user = await User.findById({ _id: author });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const userPosts = await Post.find({ author: author });

    const postCount = userPosts.length;

    return res.status(200).send({ post, user, postCount });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
