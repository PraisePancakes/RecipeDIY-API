const express = require("express");
const router = express.Router();
const addCommentController = require("../../Controllers/PATCH/addCommentController");
const verifyToken = require("../../Middlewares/verifyToken");

router.patch("/:postId", verifyToken, addCommentController);

module.exports = router;
