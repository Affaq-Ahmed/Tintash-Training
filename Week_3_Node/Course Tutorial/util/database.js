const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-tutorial', 'root', 'Affaq165', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;
