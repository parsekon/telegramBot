const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegram',
    'telegram',
    '12345678Aa',
    {
        host: '138.180.154.107',
        port: '5432',
        dialect: 'postgres'
    }
)