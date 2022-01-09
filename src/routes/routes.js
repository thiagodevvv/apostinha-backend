const express = require('express')
const app = express.Router()
const { SignUp, SignIn, ForgetPass, NewPass } = require('../api/users')
const { ActiveAccount } = require('../api/ativar')




app.use((req, res, next) => {
    console.log('Time', new Date())
    next()
})


app.post('/signup',  (req,res) => SignUp(req,res))
app.get('/ativar/:token', (req,res) => ActiveAccount(req,res))
app.post('/signin', (req,res) => SignIn(req,res))
app.post('/forgetpass', (req,res) => ForgetPass(req, res))
app.post('/newpass', (req, res) => NewPass(req, res))


module.exports = app