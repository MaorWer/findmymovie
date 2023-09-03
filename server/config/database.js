const Sequelize = require('sequelize');

const sequelize = new Sequelize('netflix','root','myNala457', {
  host: 'localhost',
  dialect: 'mysql' 
});


module.exports = sequelize;