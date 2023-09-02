const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
      path: "author",
      select: "-password ",
    });

    if (posts == null) {
      return res.status(404).send({ message: "Posts not found" });
    }

    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
