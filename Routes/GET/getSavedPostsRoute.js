const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middlewares/verifyToken");
const getSavedPostsController = require("../../Controllers/GET/getSavedPostsController");

router.get("/", verifyToken, getSavedPostsController);

module.exports = router;
