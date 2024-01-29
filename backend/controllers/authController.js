const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const registerUser = asyncHandler(async () => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fill all the fields");
  }

  const isUserExist = User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error("User Already Exists!");
  } else {
    await User.create({ name, email, password, picture });
    res.status(201);
  }
});

module.exports = { registerUser };
