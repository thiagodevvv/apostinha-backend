const User = require('../../database/models/user')

async function DescontarSaldo(idUser) {
    try{
        const user = await User.findAll({
            where: {
                id: idUser
            }
        })
        const oldSaldoString = user[0].dataValues.saldo
        const oldSaldoInt = parseInt(oldSaldoString)
        await User.update({saldo: oldSaldoInt - 1}, { where: { id: idUser }})
    }catch(err) {
        console.log('Error ao descontar saldo')
    }
}

module.exports = {
    DescontarSaldo
}