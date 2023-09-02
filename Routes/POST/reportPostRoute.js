const express = require("express");
const router = express.Router();
const reportPostController = require("../../Controllers/POST/reportPostController");
const verifyToken = require("../../Middlewares/verifyToken");

router.post("/:postId", verifyToken, reportPostController);

module.exports = router;
