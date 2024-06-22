const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'tel_bot',
    'root',
    '12345678Aa',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgresql'
    }
)