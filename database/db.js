const Sequelize = require("sequelize");
const sequelize = new Sequelize("apostinha", "root", "root", {
  dialect: "mysql",
  host: "172.20.0.2",
  port: 3306,
});

module.exports = sequelize;
