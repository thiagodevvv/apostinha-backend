const Sequelize = require('sequelize')
const database = require('../db')
const User = require('./user')

const Winners = database.define('winners', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    group: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Winners.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})

module.exports = Winners
