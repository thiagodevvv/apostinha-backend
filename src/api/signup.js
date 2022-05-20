const bcrypt = require("bcrypt");
const validatorParamsRequest = require("../functions/validatorParamsRequest");
const generateToken = require("../functions/generateToken");
const sendEmail = require("../functions/sendMail");
const schema = require("./schema/signup");
const User = require("../../database/models/user.js");
const TokensActiveAccount = require("../../database/models/tokensActiveAccount");
const saltRounds = 5;
const emailSender = process.env.EMAIL;
const passEmailSender = process.env.PASSWORD;
const secret = process.env.SECRET;

async function SignUp(req, res) {
  try {
    const isValidRequest = validatorParamsRequest(req.body, schema);
    if (!isValidRequest.valid) return res.status(400).send(isValidRequest);
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const responseInsertUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });
    const payload = { id: responseInsertUser.id };
    const token = generateToken(payload, secret);
    await TokensActiveAccount.create({
      token_active: token,
      idUser: responseInsertUser.id,
    });
    sendEmail(emailSender, passEmailSender, responseInsertUser.email, token);
    res.status(200).send({ username: responseInsertUser.username });
  } catch (err) {
    console.log(err);
    if (err.errors[0].message === "email must be unique")
      return res.status(400).send("Email já existente.");
    if (err.errors[0].message === "username must be unique")
      return res.status(400).send("Username já existente.");
    return res.status(500).send(err);
  }
}

module.exports = SignUp;
