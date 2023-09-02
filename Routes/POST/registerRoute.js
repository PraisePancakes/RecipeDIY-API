const express = require("express");
const router = express.Router();
const registerController = require("../../Controllers/POST/registerController");

router.post("/", registerController);
module.exports = router;
