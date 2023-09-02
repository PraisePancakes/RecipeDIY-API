const express = require("express");
const router = express.Router();
const deleteAccountController = require("../../Controllers/DELETE/deleteAccountController");
const verifyToken = require("../../Middlewares/verifyToken");

router.delete("/", verifyToken, deleteAccountController);

module.exports = router;
