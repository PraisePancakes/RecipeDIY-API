const User = require("../../Models/User");
const Post = require("../../Models/Post");

module.exports = async (req, res) => {
  const { title, ingredients, steps, difficulty } = req.body;
  const authorId = req.id;

  try {
    const authorExits = await User.findById(authorId);

    if (!authorExits) {
      return res.status(404).send({ message: "User / ID has not been found" });
    }
    if (title === "") {
      return res.status(400).send({ message: "Must have a title" });
    }
    if (ingredients.length === 0) {
      return res
        .status(400)
        .send({ message: "Must have at least 1 ingredient" });
    }
    if (steps.length === 0) {
      return res.status(400).send({ message: "Must have at least 1 step" });
    }

    if (difficulty === null) {
      return res.status(400).send({ message: "Please set a difficulty" });
    }
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    const ingredientsArray = ingredients.split(",");
    const stepsArray = steps.split(",");
    const newPost = new Post({
      title,
      ingredients: ingredientsArray,
      steps: stepsArray,
      author: authorId,
      difficulty,
      postImageURL: req.file.filename,
    });
    console.log(newPost);
    await newPost.save();

    return res
      .status(201)
      .send({ message: "RECIPE HAS BEEN PUBLISHED SUCCESSFULLY", newPost });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error", error });
  }
};
