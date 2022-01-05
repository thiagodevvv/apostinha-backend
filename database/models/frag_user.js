const Sequelize = require('sequelize')
const database = require('../db')
const User = require('./user')

const Frag = database.define('frag_user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    vinte_qnt: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    cinquenta_qnt: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    cem_qnt: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    quinhentos_qnt: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    vinte_wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    cinquenta_wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    cem_wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    quinhentos_wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

Frag.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})

module.exports = Frag