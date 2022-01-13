const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
const schemaToken = require('../api/schema/token')
const BlackListAuthTokens = require('../../database/models/black_list_auth_tokens')
const TokensActiveAccount = require('../../database/models/tokensActiveAccount')



async function middlewareAuth(req, res, next) {
    const token = req.headers.authorization
    //Verificar se está na blacklist
    const isValidParam = schemaToken.validate({token})
    if(isValidParam.error) return res.status(400).send('error type value token')
    const response = await BlackListAuthTokens.findAll({
        where: { token }
    })
    if(response.length > 0)
        return res.status(401).send('Token expired, need sign in again')
    jwt.verify(token, secret, async(err, decoded) => {
        if(err)
            return res.status(401).send('Unauthorized')
        const findStatusAccount = await TokensActiveAccount.findAll({
            where: {
                idUser: decoded.id
            }
        })
        if(findStatusAccount.length > 0) {
            const isValidAccount = findStatusAccount[0].dataValues.status_active
            if(!isValidAccount)
                return res.status(401).send('Conta não ativada')
        }
        else {
            return res.status(500).send('Nenhuma conta cadastrada')
        }
        req.userId = decoded.id
        next()
    })
}

module.exports = {
    middlewareAuth
}