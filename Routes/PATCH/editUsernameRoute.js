const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middlewares/verifyToken");
const editUsernameController = require("../../Controllers/PATCH/editUsernameController.js.js");

router.patch("/", verifyToken, editUsernameController);

module.exports = router;
