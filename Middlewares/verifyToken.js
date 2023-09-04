const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

module.exports = async (req, res, next) => {
  const _AT = req.cookies._AT;

  try {
    if (!_AT) {
      return res.status(401).send({ message: "MISSING ACCESS TOKEN" });
    }
    jwt.verify(_AT, ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Expired Or Invalid Token Authorization" });
      }
      req.id = user.id;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Unable to process request : request not found" });
  }
};
