const Sequelize = require('sequelize')
const database = require('../db')
const User = require('./user')

const Pix = database.define('pix_user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    keyPix: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Pix.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})

module.exports = Pix