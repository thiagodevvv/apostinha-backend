const Sequelize = require('sequelize')
const database = require('../db')
const User = require('./user')

const GroupCinquenta = database.define('group_cinquenta', {
    //esse é o group de todos players que escolherem contra 20, o idGroup é o grupo desses sub20
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idGroup: { // Vem lá do ids_group_20, mas não é FK.... PQ?
        type: Sequelize.STRING,
        allowNull: false
    }
})
GroupCinquenta.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})

module.exports = GroupCinquenta