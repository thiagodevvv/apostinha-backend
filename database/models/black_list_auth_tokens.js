const Sequelize = require('sequelize')
const database = require('../db')

const BlackListAuthTokens = database.define('black_list_auth_tokens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})


module.exports = BlackListAuthTokens