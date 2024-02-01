const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: "3h" });
};

module.exports = generateToken;
