const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'db_bot',
    'root',
    '12345678Aa',
    {
        host: '38.180.154.107',
        port: '5432',
        dialect: 'postgres'
    }
)