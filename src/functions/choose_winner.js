const IdsGroupVinte = require('../../database/models/ids_groups_20')
const GroupsVinte = require('../../database/models/group_20')
const Winners = require('../../database/models/winners')
const { getArrIdsGroup } = require('../functions/getArrIdGroup')


async function chooseWinnerVinte(){
    let arrGroups = []
    // [] pegar todos ids que não foram sorteados e estão QNT OK && e Status == 0
    try {
        const gruposParaSortear = await IdsGroupVinte.findAll({
            where: {
                qnt: 3,
                status: 0
            }
        })

        if(gruposParaSortear.length == 0 )
            return console.log('is true man, passed for test')

        const arrIdsGroups = getArrIdsGroup(gruposParaSortear)
        // [] pegar id por id, e buscar quais são o usuarios
        const promiseResult = arrIdsGroups.map(async idGroup => {
            const response = await GroupsVinte.findAll({
                where: {
                    idGroup
                }
            })
            arrGroups.push(response)
        })
        await Promise.all(promiseResult)
    
        const tst = arrGroups.map(grupo => {
           const rs = grupo.map(item => {
                return {
                    idGroup: item.dataValues.idGroup,
                    idUser: item.dataValues.idUser
                }
            })
            return rs
        })
        await Promise.all(tst)
        console.log(tst)
        // [x ] realizar sorteio
        const numeroSorteado = Math.floor(Math.random() * (0 - 3) + 3)
        console.log(`Numero sorteado:::::::::: ${numeroSorteado}`)
        const arrGanhadores = tst.map(item => {
            const arrGanhadores = {
                idUser: item[numeroSorteado].idUser,
                idGroup: item[numeroSorteado].idGroup
            }
            return arrGanhadores
        })
        await Promise.all(arrGanhadores)

        // [x] setar status = 1  (Sorteado)
        await Promise.all(arrGanhadores.map(async item => {
            await IdsGroupVinte.update({ status: 1 },{
                where: {
                    idGroup: item.idGroup
                }
            })
        }))
        // [] preencher tabela de ganhadores winners.js
        await Promise.all(arrGanhadores.map(async item => {
            await Winners.create({
                idUser: item.idUser,
                group: item.idGroup
            })
        }))
        console.log('passded winners')
        // [] preencher tabela frag_user
    }catch(err) {
        console.log('Erro no file choose_winner')
        console.log(err)
    }
}


chooseWinnerVinte()