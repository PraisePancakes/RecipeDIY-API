const express = require("express");
const router = express.Router();
const getUserPostController = require("../../Controllers/GET/getUserPostController");
const verifyToken = require("../../Middlewares/verifyToken");

router.get("/recipe/:postId", verifyToken, getUserPostController);
module.exports = router;
