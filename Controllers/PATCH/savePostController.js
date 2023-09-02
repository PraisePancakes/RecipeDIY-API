const User = require("../../Models/User");

module.exports = async (req, res) => {
  const userId = req.id;
  const { postId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.savedPosts.includes(postId)) {
      const savedPostIdx = user.savedPosts.indexOf(postId);
      user.savedPosts.splice(savedPostIdx, 1);
      await user.save();
      return res.status(400).send({ message: "Post unsaved successfully" });
    }
    user.savedPosts.push(postId);
    await user.save();

    return res.status(200).send({ message: "Post saved successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
