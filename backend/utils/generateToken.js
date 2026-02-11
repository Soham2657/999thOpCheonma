const jwt = require("jsonwebtoken");

// generates JWT token
/*
payload example:
{ id: user._id, role: user.role }
*/
module.exports = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });