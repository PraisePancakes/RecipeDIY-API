const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middlewares/verifyToken");
const getAllUsersController = require("../../Controllers/GET/getAllUsersController");

router.get("/", verifyToken, getAllUsersController);

module.exports = router;
