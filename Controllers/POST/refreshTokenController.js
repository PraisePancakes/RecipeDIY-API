const jwt = require("jsonwebtoken");
require("dotenv").config();
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
const User = require("../../Models/User");

module.exports = async (req, res) => {
  const userId = req.id;
  const _RT = req.cookies._RT;

  try {
    const user = await User.findById(userId);
    jwt.verify(_RT, REFRESH_TOKEN_SECRET_KEY, (err) => {
      if (err) {
        return res
          .status(406)
          .send({ message: "_RT has an invalid signature or is expired" });
      }

      res.clearCookie("_AT", {
        expires: new Date(0),
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });

      const ACCESS_TOKEN = jwt.sign(
        {
          id: userId,
        },
        ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: ACCESS_TOKEN_EXPIRY,
        }
      );

      res.cookie("_AT", ACCESS_TOKEN, {
        path: "/",
        httpOnly: true,
        expiresIn: new Date(Date.now() + 60000 * 60 * 24 * 24 * 6),
        sameSite: "lax",
      });

      return res.send({
        message: "_AT has been refreshed",
        user: user,
      });
    });
  } catch (error) {
    // If the refresh token has expired or any other error occurs, handle it here.
    return res.status(400).send({ message: "No _RT must be authenticate" });
  }
};
