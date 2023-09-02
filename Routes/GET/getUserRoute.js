const express = require("express");
const router = express.Router();
const getUserController = require("../../Controllers/GET/getUserController");
const verifyToken = require("../../Middlewares/verifyToken");

router.get("/", verifyToken, getUserController);
module.exports = router;
