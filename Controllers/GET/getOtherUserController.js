const User = require("../../Models/User");

module.exports = async (req, res) => {
  const { otherUserId } = req.params;

  try {
    const otherUser = await User.findById(otherUserId, "-password ");
    if (!otherUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const friends = await User.find(
      { _id: { $in: otherUser.friends } },
      "username profileImgURL"
    );

    return res.status(200).send({ otherUser, friends });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
