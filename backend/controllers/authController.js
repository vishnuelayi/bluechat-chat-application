const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken");

//controller for register a user(signup)
const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  if (!fname || !lname || !email || !password) {
    res.status(400).json({ error: "Fill all the fields" });
    return;
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    res.status(400).json({ error: "User Already Exists!" });
    return;
  }

  const user = await User.create({ fname, lname, email, password });
  res.status(201);
  res.json({
    _id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    password: user.password,
    picture: user.picture,
    token: generateToken(user._id),
  });
});

//controller for login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email/password");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
      picture: user.picture,
      token: generateToken(user._id),
    });
  }
});


//to get all other users (exept the logged in one)
const getUsers = asyncHandler(async (req, res) => {

 
  try {
   
    const keyword = req.query.search ? {
      $or:[
        { fname: { $regex: req.query.search, $options: "i" }},
        { email: { $regex: req.query.search, $options: "i" }},
      ]
    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.json(users);

  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { registerUser, loginUser, getUsers };
