const express = require("express");
const router = express.Router();
const uploadProfilePictureController = require("../../Controllers/POST/uploadProfilePictureController");
const verifyToken = require("../../Middlewares/verifyToken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../server/User_Mult_Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  uploadProfilePictureController
);

module.exports = router;
