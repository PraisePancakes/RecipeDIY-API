const express = require("express");
const router = express.Router();
const deletePostController = require("../../Controllers/DELETE/deletePostController");
const verifyToken = require("../../Middlewares/verifyToken");

router.delete("/:postId", verifyToken, deletePostController);

module.exports = router;
