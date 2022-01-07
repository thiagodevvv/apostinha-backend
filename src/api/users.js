const schema = require('./functions/validateParamsSignUp')
const connectDB = require('../../database/db')
const bcrypt = require('bcrypt');
const saltRounds = 10

    
async function SignUp(req, res) {

    const response = schema.validate(req.body)
    if(response.error)
        return res.send(response.error)
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
            console.log(hash)
    }).catch(err => {
        console.log(err)
    });
}




module.exports = {
    SignUp
}