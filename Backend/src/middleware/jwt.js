require("dotenv").config({ path: "../env/.env" });
const jwt = require("jsonwebtoken");

const createJWT = async (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRE_TIME}
  );
};

const verifyJWT = (req, res, next) => {
  try {
    
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({ message: " No token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      req.jwt_payload = decoded;

      if (err) {
        return res.status(400).json({
          message: "An unexpected error has occured! Please login again.",
        });
      }
      if (isNaN(decoded.email))
        return res.status(400).json({ message: "Invalid token" });
      return next();
    });

    return null;
  } catch (err) {
    res.status(500).json({ message: "Server Error. Try again later" });
  }
};

module.exports = { createJWT, verifyJWT };