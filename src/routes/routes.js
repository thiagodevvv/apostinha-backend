const express = require('express')
const app = express.Router()
const { SignUp } = require('../api/users')




app.use((req, res, next) => {
    console.log('Time', new Date())
    next()
})


app.post('/signup',  (req,res) => SignUp(req,res))



module.exports = app