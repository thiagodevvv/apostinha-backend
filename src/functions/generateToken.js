var jwt = require("jsonwebtoken");
function generateToken(payload, secret) {
  try {
    const token = jwt.sign(payload, secret);
    return token;
  } catch (err) {
    const errorString = `${err}`;
    return errorString;
  }
}

module.exports = generateToken;
