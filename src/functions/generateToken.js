var jwt = require("jsonwebtoken");

function generateToken(payload, secret) {
  const token = jwt.sign(payload, secret);
  return token;
}

module.exports = generateToken;
