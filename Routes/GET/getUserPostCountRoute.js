const express = require("express");
const router = express.Router();
const getUserPostCountController = require("../../Controllers/GET/getUserPostCountController");
const verifyToken = require("../../Middlewares/verifyToken");

router.get("/", verifyToken, getUserPostCountController);
module.exports = router;
