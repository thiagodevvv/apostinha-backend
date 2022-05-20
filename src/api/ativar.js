const TokensActiveAccount = require("../../database/models/tokensActiveAccount");
var jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

async function ActiveAccount(req, res) {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, secret);
    await TokensActiveAccount.update(
      { status_active: true },
      {
        where: {
          idUser: decodedToken.id,
        },
      }
    );
    res.status(200).send("Conta Ativada!");
  } catch {
    console.log("Error ao ativar conta");
    res.status(500);
  }
}

module.exports = {
  ActiveAccount,
};
