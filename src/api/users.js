const bcrypt = require('bcrypt');
const schemaSignUp = require('./schema/signup')
const schemaSignIn = require('./schema/signin')
const User = require('../../database/models/user.js')
const TokensActiveAccount = require('../../database/models/tokensActiveAccount')
const { generateToken } = require('../functions/generateToken')
const { sendEmail } = require('../functions/sendMail');
const { send } = require('express/lib/response');



const saltRounds = 5
const emailSender = process.env.EMAIL
const passEmailSender = process.env.PASSWORD
const secret = process.env.SECRET
    
async function SignUp(req, res) {
    const isValidParams = schemaSignUp.validate(req.body)
    if(isValidParams.error)
        return res.send(isValidParams.error)
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
        sendEmail(emailSender, passEmailSender, responseInsertUser.email, token)
        res.status(200).send({ username: responseInsertUser.username })

    }).catch(err => {
        return res.status(400).send(err)
    });
}


async function SignIn(req, res) {

    const isValidParams = schemaSignIn.validate(req.body)
    if(isValidParams.error)
        return res.send(isValidParams.error)
    const arr = req.body.userNameOrEmail.split('')
    const haveArroba = arr.includes("@")
    if(haveArroba) {
            
            const response = await User.findAll({
                where: {
                    email: req.body.userNameOrEmail
                }
            })
            if(response.length > 0)
                bcrypt.compare(req.body.password, response[0].dataValues.password, function (err, result) {
                    if(result) {
                        const token = generateToken({id: response[0].dataValues.id}, secret)
                        return res.send({ username:response[0].dataValues.username, token: token})
                    }
                    else 
                        return res.status(404).send('Usuário não encontrado')
                })
            else 
                return res.status(404).send('Usuário não encontrado')
    } else {
        //procurar por username
        const response = await User.findAll({
            where: {
                username: req.body.userNameOrEmail
            }
        })
        if(response.length > 0 )
            bcrypt.compare(req.body.password, response[0].dataValues.password, function (err, result) {
                if(result) {
                    const token = generateToken({id: response[0].dataValues.id}, secret)
                    return res.send({ username:response[0].dataValues.username, token: token})
                }
                else
                    return res.status(404).send('Usuário não encontrado')
            })
        else
            return res.status(404).send('Usuário não encontrado')
    }   
}

module.exports = {
    SignUp,
    SignIn
}