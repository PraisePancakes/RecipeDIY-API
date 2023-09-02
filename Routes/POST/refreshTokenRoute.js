const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../Controllers/POST/refreshTokenController");
const verifyToken = require("../../Middlewares/verifyToken");

router.post("/", verifyToken, refreshTokenController);

module.exports = router;
