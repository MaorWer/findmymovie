const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const MovieMaker = sequelize.define('moviemaker',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idMaker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idMovie: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = MovieMaker;