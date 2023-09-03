const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Contact = sequelize.define('contact',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    minLength: 4,
    maxLength: 20,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    minLength: 6,
    maxLength: 30,
    required: true
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
    minLength: 6,
  }
});

module.exports = Contact;