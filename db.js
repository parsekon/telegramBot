const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'postgres',
    'postgres',
    '',
    {
        host: '138.180.154.107',
        port: '5432',
        dialect: 'postgres'
    }
)