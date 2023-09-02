const express = require("express");
const router = express.Router();
const savePostController = require("../../Controllers/PATCH/savePostController");
const verifyToken = require("../../Middlewares/verifyToken");

router.patch("/:postId", verifyToken, savePostController);

module.exports = router;
