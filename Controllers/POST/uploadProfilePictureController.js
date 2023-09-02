const User = require("../../Models/User");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  const userId = req.id;

  try {
    const userExists = await User.findById(userId);
    if (userExists.profileImgURL !== "") {
      const previousImagePath = path.join(
        __dirname,
        "../../User_Mult_Images",
        userExists.profileImgURL
      );
      fs.unlink(previousImagePath, (err) => {
        if (err) {
          console.error("Error deleting previous profile picture:", err);
        } else {
          console.log("Previous profile picture deleted");
        }
      });
    }
    if (!userExists) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    userExists.profileImgURL = req.file.filename; // Save the filename or the file path, based on your model schema
    await userExists.save();
    return res
      .status(200)
      .send({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
