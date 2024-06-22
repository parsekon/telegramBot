const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'tel_bot',
    'root',
    'root',
    {
        host: '138.180.154.107',
        port: '5432',
        dialect: 'postgres'
    }
)