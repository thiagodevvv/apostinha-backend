const Sequelize = require('sequelize')
const database = require('../db')
const User = require('./user')

const TokensRecoveryPass = database.define('tokens_recovery', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    token_recovery: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

TokensRecoveryPass.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})

module.exports = TokensRecoveryPass
