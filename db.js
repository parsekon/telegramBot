const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'bot',
    'admin',
    'root',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
)