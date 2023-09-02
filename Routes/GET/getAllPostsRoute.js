const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middlewares/verifyToken");
const getAllPostsController = require("../../Controllers/GET/getAllPostsController");

router.get("/", verifyToken, getAllPostsController);

module.exports = router;
