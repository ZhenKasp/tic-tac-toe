const sequelize = require('./sequelize.js');
const { DataTypes } = require('sequelize');
const isUnique = require('../utilities/isUnique');

const User = sequelize.define('user', {
  username:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  firstname:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  lastname:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  email:{
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Invalid Email.'
      },
      isUnique: isUnique("User", "email")
    }
  },
  password:{
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  },
  lastSignInAt: {
    type: DataTypes.DATE
  }
}, { 
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

module.exports = User;