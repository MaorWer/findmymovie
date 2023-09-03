const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Movie = sequelize.define('movie',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Movie;