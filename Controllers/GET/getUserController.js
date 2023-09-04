const User = require("../../Models/User");

module.exports = async (req, res) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    return new Error(error);
  }

  return res.status(200).send({ user });
};
