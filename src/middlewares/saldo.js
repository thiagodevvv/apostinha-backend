const User = require('../../database/models/user')

async function saldo(req, res, next) {
    try{
        const user = await User.findAll({
            where: {
                id: req.userId
            }
        })
        const oldSaldoString = user[0].dataValues.saldo
        const oldSaldoInt = parseInt(oldSaldoString)
        if(oldSaldoInt == 0) 
            return res.status(500).send('Usuário sem saldo')
        next()
    }catch(err) {
        console.log('Error ao consultar saldo')
    }
}

module.exports = {
    saldo
}