const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'tel_bot',
    'root',
    'root',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgresql'
    }
)