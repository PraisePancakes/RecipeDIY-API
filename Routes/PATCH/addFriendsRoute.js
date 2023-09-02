const express = require("express");
const router = express.Router();
const addFriendsController = require("../../Controllers/PATCH/addFriendsController");
const verifyToken = require("../../Middlewares/verifyToken");

router.patch("/", verifyToken, addFriendsController);

module.exports = router;
