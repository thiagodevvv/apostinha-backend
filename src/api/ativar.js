const TokensActiveAccount = require('../../database/models/tokensActiveAccount')
var jwt = require('jsonwebtoken');
const secret = process.env.SECRET


async function ActiveAccount(req, res) {
    try {

        const token = req.params.token
        const decodedToken = jwt.verify(token, secret)
        const active = await TokensActiveAccount.update({status_active: true}, {
            where: {
                idUser: decodedToken.id
            }
        })
        console.log(active)
        res.status(200).send("Conta Ativada!")
    }catch {
        res.status(500)
    }
}


module.exports = {
    ActiveAccount
}