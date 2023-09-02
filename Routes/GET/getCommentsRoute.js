const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middlewares/verifyToken");
const getCommentsController = require("../../Controllers/GET/getCommentsController");

router.get("/:postId", verifyToken, getCommentsController);

module.exports = router;
