const Sequelize = require('sequelize')
const database = require('../db')
const User = require('./user')

const TokensActiveAccount = database.define('token_active_account', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    token_active: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})


TokensActiveAccount.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})


module.exports = TokensActiveAccount