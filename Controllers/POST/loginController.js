const bcrypt = require("bcrypt");
const User = require("../../Models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (username == "") {
    return res.status(400).send({ message: "INVALID USERNAME INPUT" });
  } else if (password == "") {
    return res.status(400).send({ message: "INVALID PASSWORD INPUT" });
  } else if (!userExists) {
    return res.status(400).send({ message: "INVALID USERNAME OR PASSWORD" });
  }

  const matched = await bcrypt.compare(password, userExists.password);

  if (!matched) {
    return res.status(400).send({ message: "INVALID USERNAME OR PASSWORD" });
  }

  const ACCESS_TOKEN = jwt.sign(
    {
      id: userExists._id,
    },
    ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );

  const REFRESH_TOKEN = jwt.sign(
    { id: userExists._id },
    REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );

  res.clearCookie("_RT", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
  });

  res.clearCookie("_AT", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
  });

  res.cookie("_AT", ACCESS_TOKEN, {
    path: "/",
    httpOnly: true,
    expiresIn: new Date(Date.now() + 60000 * 60 * 24 * 24 * 6),
    sameSite: "lax",
  });

  res.cookie("_RT", REFRESH_TOKEN, {
    path: "/",
    httpOnly: true,
    expiresIn: new Date(Date.now() + 60000 * 60 * 24 * 24 * 6),
    sameSite: "lax",
  });

  return res.status(200).send({
    message: "Successfully Logged In",
    user: userExists,
  });
};
