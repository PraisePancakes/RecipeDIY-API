const express = require("express");
const router = express.Router();
const getYourPostsController = require("../../Controllers/GET/getYourPostsController");
const verifyToken = require("../../Middlewares/verifyToken");

router.get("/", verifyToken, getYourPostsController);
module.exports = router;
