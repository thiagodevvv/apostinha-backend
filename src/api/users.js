const bcrypt = require('bcrypt');
const schema = require('./functions/validateParamsSignUp')
const User = require('../../database/models/user.js')
const TokensActiveAccount = require('../../database/models/tokensActiveAccount')
const { generateToken } = require('../functions/generateToken')
const { sendEmail } = require('../functions/sendMail')



const saltRounds = 5
const emailSender = process.env.EMAIL
const passEmailSender = process.env.PASSWORD
const secret = process.env.SECRET



    
async function SignUp(req, res) {
    const response = schema.validate(req.body)
    if(response.error)
        return res.send(response.error)
    bcrypt.hash(req.body.password, saltRounds).then(async function(hash) {
        console.log('ANTES DO INSERT USER')
        const responseInsertUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash
        })
        const payload = { id: responseInsertUser.id }
        const token = generateToken(payload, secret)
        console.log('ANTES DO TOKENS ACTIVE')
        await TokensActiveAccount.create({
            token_active: token,
            idUser: responseInsertUser.id
        })
        console.log('ANTES DO SEND EMAIL')
        sendEmail(emailSender, passEmailSender, responseInsertUser.email, token)
        console.log('Foi?')
        res.status(200).send({ username: responseInsertUser.username })
    }).catch(err => {
        return res.status(400).send(err)
    });
}

module.exports = {
    SignUp
}