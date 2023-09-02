const express = require("express");
const router = express.Router();
const getOtherUserController = require("../../Controllers/GET/getOtherUserController");
const verifyToken = require("../../Middlewares/verifyToken");

router.get("/:otherUserId", verifyToken, getOtherUserController);
module.exports = router;
