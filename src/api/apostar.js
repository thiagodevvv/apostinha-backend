const IdsGroupVinte = require('../../database/models/ids_groups_20')
const GroupVinte = require('../../database/models/group_20')
const { DescontarSaldo } = require('../functions/descontaSaldo')


async function ApostarVinte(req, res){
    try {
        const idUser = req.userId
        const responseIdsVinte = await IdsGroupVinte.findAll()
        if(responseIdsVinte.length == 0) {
            //primeiro registro
            const responseInsertIdGroup = await IdsGroupVinte.create({
                idGroup: 1,
                qnt: 1
            })
            if(responseInsertIdGroup) {

                const responseInsertGroupUser = await GroupVinte.create({
                    idGroup: 1,
                    idUser
                })
                if(responseInsertGroupUser) {
                    await DescontarSaldo(idUser)
                    return res.status(200).send('Usuario incluido no grupo de apostas com sucesso.')
                }
                else return res.status(500).send('Error ao incluir usuário no grupo de apostas 20')
            }
            else 
                return res.status(500).send('Error ao inserir na tabela ids group vinte')
        }else {
            const lastIdGroup = responseIdsVinte.length - 1
            if(responseIdsVinte[lastIdGroup].dataValues.qnt < 3) {
                //insere
                await IdsGroupVinte.update({qnt: responseIdsVinte[lastIdGroup].dataValues.qnt + 1 }, {where: { id: responseIdsVinte[lastIdGroup].dataValues.id }})
                await GroupVinte.create({
                    idGroup: responseIdsVinte[lastIdGroup].dataValues.idGroup,
                    idUser
                })
                await DescontarSaldo(idUser)
                return res.status(200).send('Aposta contra 20 realizada com sucesso.')
            }else {
                //criar outro idGroup
                await IdsGroupVinte.create({
                    idGroup: responseIdsVinte[lastIdGroup].dataValues.idGroup + 1,
                    qnt: 1
                })
                await GroupVinte.create({
                    idGroup: responseIdsVinte[lastIdGroup].dataValues.idGroup + 1,
                    idUser,
                })
                await DescontarSaldo(idUser)
                return res.status(200).send('Aposta contra 20 realizada com sucesso.')
            }
    }
    }catch(err) {
        return res.status(500).send('Erro ao apostar no grupo de 20')
    }
}

module.exports = {
    ApostarVinte
}