const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateAccessToken = (email) => {
  return jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

module.exports = generateAccessToken;