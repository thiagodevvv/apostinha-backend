var jwt = require('jsonwebtoken');
// const toks = jwt.verify(token, secret)

// console.log(toks)



function generateToken (payload, secret) {
    const token = jwt.sign(payload, secret)

    return token
}


module.exports = {
    generateToken
}