const Post = require("../../Models/Post");
const User = require("../../Models/User");

module.exports = async (req, res) => {
  const userId = req.id;
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    console.log(user);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    console.log("Received Comment:", comment);

    // Push the comment to the post.comments array
    post.comments.push({
      userId: userId,
      content: comment,
      userDetails: {
        username: user.username,
        profileImgURL: user.profileImgURL,
      },
    });
    console.log("Updated Post:", post);

    // Save the updated post with the new comment
    await post.save();
    return res.status(200).send({ message: "Added Comment" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
