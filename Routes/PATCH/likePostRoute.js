const express = require("express");
const router = express.Router();
const likePostController = require("../../Controllers/PATCH/likePostController");
const verifyToken = require("../../Middlewares/verifyToken");

router.patch("/:postId", verifyToken, likePostController);

module.exports = router;
