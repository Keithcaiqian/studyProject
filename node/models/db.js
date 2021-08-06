const { Sequelize } = require('sequelize');
const { sqlLogger } = require("../logger");

const sequelize = new Sequelize('myschool', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: (msg) => {
        sqlLogger.debug(msg);
    },
});

module.exports = sequelize;

