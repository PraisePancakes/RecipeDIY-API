const express = require("express");
const router = express.Router();
const loginController = require("../../Controllers/POST/loginController");

router.post("/", loginController);
module.exports = router;
