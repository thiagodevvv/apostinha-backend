const Sequelize = require('sequelize')
const database = require('../db')


const IdsGroupVinte = database.define('ids_groups_vinte', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idGroup: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    qnt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false // FAlse pq ainda não foi sorteado o ganhador. ENtão, a lógica é se esse idgroup ja tem a quantidade 20 e status false, quer dizer
        //que ainda não sorteou, assim que sortear, setar pra true
    }
})

module.exports = IdsGroupVinte