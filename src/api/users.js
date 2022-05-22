const bcrypt = require("bcrypt");
const schemaEmail = require("./schema/emailForgetPass");
const schemaNewPass = require("./schema/newpass");
const schemaToken = require("./schema/token");
const User = require("../../database/models/user.js");
const TokensRecoveryPass = require("../../database/models/tokens_recovery");
const BlackListAuthTokens = require("../../database/models/black_list_auth_tokens");
const { sendEmailForgetPass } = require("../functions/sendEmailForgetPass");
const { v4: uuidv4 } = require("uuid");

const emailSender = process.env.EMAIL;
const passEmailSender = process.env.PASSWORD;

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
    const hash = bcrypt.hash(req.body.newpass);
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
  } else return res.status(404).send("Token não encontrado");
}

async function Logout(req, res) {
  const token = req.headers["authorization"];
  const isValidParam = schemaToken.validate({ token });
  if (isValidParam.error) return res.status(400);

  const responseInsertTokenBL = await BlackListAuthTokens.create({
    token,
  });
  if (responseInsertTokenBL.id > 0)
    return res.status(200).send("Token expire with success");
  else
    return res.status(500).send("Error when delete insert token in black list");
}

module.exports = {
  ForgetPass,
  NewPass,
  Logout,
};
