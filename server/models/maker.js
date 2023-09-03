const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Maker = sequelize.define('maker',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Maker;