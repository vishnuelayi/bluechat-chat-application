const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  // console.log(decoded);
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized, no user");
  }
  req.user = user;
  next();
});

module.exports = authMiddleware;
