const Sequelize = require('sequelize');

// create database yahoo_fake;
const connection = new Sequelize('yahoo_fake', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection;
