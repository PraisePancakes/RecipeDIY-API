const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middlewares/verifyToken");
const getPostLikesController = require("../../Controllers/GET/getPostLikesController");

router.get("/:postId", verifyToken, getPostLikesController);

module.exports = router;
