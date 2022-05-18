const bcrypt = require("bcrypt");
const schemaSignUp = require("./schema/signup");
const schemaSignIn = require("./schema/signin");
const schemaEmail = require("./schema/emailForgetPass");
const schemaNewPass = require("./schema/newpass");
const schemaToken = require("./schema/token");
const User = require("../../database/models/user.js");
const TokensRecoveryPass = require("../../database/models/tokens_recovery");
const TokensActiveAccount = require("../../database/models/tokensActiveAccount");
const BlackListAuthTokens = require("../../database/models/black_list_auth_tokens");
const { generateToken } = require("../functions/generateToken");
const { sendEmail } = require("../functions/sendMail");
const { sendEmailForgetPass } = require("../functions/sendEmailForgetPass");
const { v4: uuidv4 } = require("uuid");

const saltRounds = 5;
const emailSender = process.env.EMAIL;
const passEmailSender = process.env.PASSWORD;
const secret = process.env.SECRET;

async function SignUp(req, res) {
  const isValidParams = schemaSignUp.validate(req.body);
  if (isValidParams.error) return res.send(isValidParams.error);
  bcrypt
    .hash(req.body.password, saltRounds)
    .then(async function (hash) {
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
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
}

async function SignIn(req, res) {
  const isValidParams = schemaSignIn.validate(req.body);
  if (isValidParams.error) return res.send(isValidParams.error);
  const arr = req.body.userNameOrEmail.split("");
  const haveArroba = arr.includes("@");
  if (haveArroba) {
    const response = await User.findAll({
      where: {
        email: req.body.userNameOrEmail,
      },
    });
    if (response.length > 0)
      bcrypt.compare(
        req.body.password,
        response[0].dataValues.password,
        function (err, result) {
          if (result) {
            const token = generateToken(
              { id: response[0].dataValues.id },
              secret
            );
            return res.send({
              username: response[0].dataValues.username,
              token: token,
            });
          } else return res.status(404).send("Usuário não encontrado");
        }
      );
    else return res.status(404).send("Usuário não encontrado");
  } else {
    //procurar por username
    const response = await User.findAll({
      where: {
        username: req.body.userNameOrEmail,
      },
    });
    if (response.length > 0)
      bcrypt.compare(
        req.body.password,
        response[0].dataValues.password,
        function (err, result) {
          if (result) {
            const token = generateToken(
              { id: response[0].dataValues.id },
              secret
            );
            return res.send({
              username: response[0].dataValues.username,
              token: token,
            });
          } else return res.status(404).send("Usuário não encontrado");
        }
      );
    else return res.status(404).send("Usuário não encontrado");
  }
}

async function ForgetPass(req, res) {
  const isValidParam = schemaEmail.validate(req.body);

  if (isValidParam.error) return res.status(404).send(isValidParam.error);

  const response = await User.findAll({
    where: {
      email: req.body.email,
    },
  });
  if (response.length > 0) {
    const fulltoken = uuidv4();
    const token_recovery = fulltoken.slice(9, 13);
    await TokensRecoveryPass.create({
      token_recovery,
      idUser: response[0].dataValues.id,
    });
    sendEmailForgetPass(
      emailSender,
      passEmailSender,
      req.body.email,
      token_recovery
    );
    return res
      .status(200)
      .send("Email de recuperação de senha enviado com sucesso");
  } else return res.status(404).send("Email não cadastrado.");
}

async function NewPass(req, res) {
  const isValidParams = schemaNewPass.validate(req.body);
  if (isValidParams.error) return res.send(isValidParams.error);
  const isValidTokenRecovery = await TokensRecoveryPass.findAll({
    where: {
      token_recovery: req.body.token,
    },
  });
  if (isValidTokenRecovery.length > 0) {
    const iduser = isValidTokenRecovery[0].dataValues.id;
    bcrypt
      .hash(req.body.newpass, saltRounds)
      .then(async function (hash) {
        const responseUpdate = await User.update(
          { password: hash },
          {
            where: {
              id: iduser,
            },
          }
        );
        if (responseUpdate.length > 0)
          return res.status(200).send("Senha alterada com sucesso");
        else return res.status(200).send("Erro ao alterar senha do usuário");
      })
      .catch((err) => {
        console.log("error ao gerar hash new password");
        return res.send(err);
      });
  } else return res.status(404).send("Token não encontrado");
}

async function Logout(req, res) {
  const token = req.headers["authorization"];
  const isValidParam = schemaToken.validate({ token });
  if (isValidParam.error) return res.status(400);

  const responseInsertTokenBL = await BlackListAuthTokens.create({
    token,
  });
  console.log(responseInsertTokenBL.id);
  if (responseInsertTokenBL.id > 0)
    return res.status(200).send("Token expire with success");
  else
    return res.status(500).send("Error when delete insert token in black list");
}

module.exports = {
  SignUp,
  SignIn,
  ForgetPass,
  NewPass,
  Logout,
};
