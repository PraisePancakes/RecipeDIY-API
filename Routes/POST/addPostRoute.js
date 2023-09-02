const express = require("express");
const router = express.Router();
const addPostController = require("../../Controllers/POST/addPostController");
const verifyToken = require("../../Middlewares/verifyToken");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../server/Post_Mult_Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.post("/", verifyToken, upload.single("image"), addPostController);

module.exports = router;
