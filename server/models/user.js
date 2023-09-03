const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('user',{
    id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    minLength: 4,
    maxLength: 20,
    required: true,
  },
  lastName: {
    type: Sequelize.STRING,
    minLength: 4,
    maxLength: 20,
  },
  email: {
    type: Sequelize.STRING,
    minLength: 6,
    maxLength: 30,
    required: true,
    unique: true
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    required: true,
  },
  imageId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;