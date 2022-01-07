const bcrypt = require('bcrypt');
const schema = require('./functions/validateParamsSignUp')
const User = require('../../database/models/user.js')
const TokensActiveAccount = require('../../database/models/tokensActiveAccount')
const { generateToken } = require('../functions/generateToken')
const saltRounds = 10
const secret = process.env.SECRET


    
async function SignUp(req, res) {

    const response = schema.validate(req.body)
    if(response.error)
        return res.send(response.error)

    bcrypt.hash(req.body.password, saltRounds).then(async function(hash) {
        
        const responseInsertUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash
        })
        const payload = { id: responseInsertUser.id }
        const token = generateToken(payload, secret)
        await TokensActiveAccount.create({
            token_active: token,
            idUser: responseInsertUser.id
        })
        res.status(200).send({ username: responseInsertUser.username })
    }).catch(err => {
        return res.status(400).send(err)
    });
}




module.exports = {
    SignUp
}