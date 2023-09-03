const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const UserMovie = sequelize.define('userMovie',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUser: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idMovie: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = UserMovie;