const User = require("../../Models/User");

module.exports = async (req, res) => {
  const userId = req.id;
  const { username } = req.body;

  try {
    const user = await User.findById(userId);
    const usernameExists = await User.find({ username });

    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    if (!username) {
      return res.status(400).send({ message: "Must input a username" });
    }
    if (username === user.username) {
      return res.status(400).send({ message: "Already have that name!" });
    }

    if (usernameExists.length > 0) {
      return res.status(400).send({ message: "Username already exits" });
    }

    user.username = username; // Update the username field
    await user.save(); // Save the updated user object

    return res.status(200).send({ message: "Username updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: "An error occurred" });
  }
};
