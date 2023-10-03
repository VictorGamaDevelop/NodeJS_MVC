const Sequelize = require('sequelize');

const config = require('../config/config.json');

module.exports = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});
