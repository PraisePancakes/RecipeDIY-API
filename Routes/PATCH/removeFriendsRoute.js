const express = require("express");
const router = express.Router();
const removeFriendsController = require("../../Controllers/PATCH/removeFriendsController");
const verifyToken = require("../../Middlewares/verifyToken");

router.patch("/", verifyToken, removeFriendsController);

module.exports = router;
