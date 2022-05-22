const findUser = require("../functions/findUser");
const validatorParamsRequest = require("../functions/validatorParamsRequest");
const schema = require("./schema/signin");
async function SignIn(req, res) {
  const isValidRequest = validatorParamsRequest(req.body, schema);
  if (!isValidRequest.valid) return res.status(400).send(isValidRequest);
  //user can do login with username and email
  const user = await findUser(req.body.userNameOrEmail, req.body.password);
  if (!user) return res.status(400).send("Usuário não encontrado.");
  return res.status(200).send(user);
}

module.exports = SignIn;
