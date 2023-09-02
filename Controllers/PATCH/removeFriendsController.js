const User = require("../../Models/User");

module.exports = async (req, res) => {
  const userId = req.id;
  const { friendId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .send({ message: "invalid userId, userId not found" });
    }

    if (!friendId) {
      return res
        .status(400)
        .send({ message: "invalid friendId, friendId not found" });
    }

    if (!user.friends.includes(friendId)) {
      return res.status(400).send({ message: "User is not your friend" });
    }
    const friend = user.friends.indexOf(friendId);
    user.friends.splice(friend, 1);
    await user.save();
    return res.json({ message: "Friend removed successfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "error iterating through controller" });
  }
};
