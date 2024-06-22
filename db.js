const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'bot',
    'admin',
    'root',
    {
        host: '138.180.154.107',
        port: '5432',
        dialect: 'postgres'
    }
)