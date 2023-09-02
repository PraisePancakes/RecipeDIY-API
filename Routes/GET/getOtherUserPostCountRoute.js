const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middlewares/verifyToken");
const getOtherUserPostCountController = require("../../Controllers/GET/getOtherUserPostCountController");

router.get("/:otherUserId", verifyToken, getOtherUserPostCountController);
module.exports = router;
