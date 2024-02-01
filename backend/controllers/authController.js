const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fill all the fields");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    res.status(400);
    throw new Error("User Already Exists!");
  } else {
    const user = await User.create({ name, email, password });
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      picture: user.picture,
      token: generateToken(user._id),
    });
  }
});

module.exports = { registerUser };
