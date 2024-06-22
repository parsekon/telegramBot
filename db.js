const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'bot',
    'admin',
    'root',
    {
        host: '127.1.1.1',
        port: '5432',
        dialect: 'postgres'
    }
)