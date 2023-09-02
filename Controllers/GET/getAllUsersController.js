const User = require("../../Models/User");

module.exports = async (req, res) => {
  const currentUserId = req.id;
  try {
    const allUsers = await User.find(
      { _id: { $ne: currentUserId } },
      "-password"
    );
    if (allUsers === null) {
      return res.status(400).send({ message: "No users currently" });
    }
    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(400).send(error);
  }
};
