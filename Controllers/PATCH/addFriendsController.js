const User = require("../../Models/User");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const userId = req.id;
  const { friendId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!friendId || !mongoose.isValidObjectId(friendId)) {
      return res.status(404).json({ error: "Invalid friendId" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: "Friend already added" });
    }

    user.friends.push(friendId);
    await user.save();
    return res.json({ message: "Friend added successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
