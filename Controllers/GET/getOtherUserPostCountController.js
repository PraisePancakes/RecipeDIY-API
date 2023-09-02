const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  const { otherUserId } = req.params;

  try {
    const userPosts = await Post.find({ author: otherUserId });

    if (!userPosts) {
      return res.status(404).send({ message: "No posts currently" });
    }
    const postCount = userPosts.length;

    return res.status(200).send({ postCount });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
