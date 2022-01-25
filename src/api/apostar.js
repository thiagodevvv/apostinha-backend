const { Op } = require("sequelize")
const IdsGroupVinte = require('../../database/models/ids_groups_20')
const GroupVinte = require('../../database/models/group_20')
const { DescontarSaldo } = require('../functions/descontaSaldo')
const { getArrIdsUser } = require('../functions/getArrIdsUser')

async function ApostarVinte(req, res){
    try {
        let idGroupLivre = 0
        let pkIdGroupLivre = 0
        let qntIdGroupLivre = 0
        const idUser = req.userId
        // const responseIdsVinte = await IdsGroupVinte.findAll({ where: {
        //     qnt: {
        //         [Op.lt]: 3
        //     },
        //     status: 0
        // }})// todos ainda não sorteados
        const responseIdsVinte =  await IdsGroupVinte.findAll()
        const lastIdGroup = responseIdsVinte.length - 1
        const responseGroupVinte = await GroupVinte.findAll({where: { idUser:idUser }})//aqui eu pego todos IdGrupos que ele está 
        console.log(responseIdsVinte)
        console.log('///////////')
        console.log(responseGroupVinte)
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
            if(responseGroupVinte.length == 0){
                //usuario sem nenhum group.
                const disponivelIds = await IdsGroupVinte.findAll({ where: {
                    qnt: {
                        [Op.lt]: 3
                    },
                    status: 0
                }})// todos ainda não sorteados e menor que 20
                if(disponivelIds.length == 0) {
                    //criar novo ID pq não tem disponivel
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
                }else {
                    //Pegar o primeiro id disponivel
                    const idGroup = disponivelIds[0].dataValues.idGroup
                    qntIdGroupLivre = disponivelIds[0].dataValues.qnt
                    await IdsGroupVinte.update({qnt: qntIdGroupLivre + 1 }, {where: { idGroup: idGroup }})
                    await GroupVinte.create({
                        idGroup: idGroup,
                        idUser
                    })
                    await DescontarSaldo(idUser)
                    return res.status(200).send('Aposta contra 20 realizada com sucesso.')
                }           

            }else {
                    //o usuario está participando de grupos
                    //////////////////////////////////////////////////////////
                const disponivelIds = await IdsGroupVinte.findAll({ where: {
                    qnt: {
                        [Op.lt]: 3
                    },
                    status: 0
                }})// todos ainda não sorteados e menor que 20
                if(disponivelIds.length == 0) {
                    //criar novo ID pq não tem disponivel
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
                }else {
                    const arrIdsUser = getArrIdsUser(responseGroupVinte)
                    disponivelIds.forEach(element => {
                        if(!arrIdsUser.includes(element.dataValues.idGroup)) {
                            idGroupLivre = element.dataValues.idGroup
                            qntIdGroupLivre = element.dataValues.qnt
                            pkIdGroupLivre = element.dataValues.id
                        }
                    })
                }           
                if(idGroupLivre > 0) {
                    console.log('idGroupLivress')
                    //insere
                    await IdsGroupVinte.update({qnt: qntIdGroupLivre + 1 }, {where: { id: pkIdGroupLivre }})
                    await GroupVinte.create({
                        idGroup: idGroupLivre,
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
    }
    }catch(err) {
        console.log(err)
        return res.status(500).send('Erro ao apostar no grupo de 20')
    }
}

module.exports = {
    ApostarVinte
}