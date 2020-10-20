const sequelize = require('./sequelize.js');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Game = sequelize.define('game', {
  name:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  moves:{
    type: DataTypes.ARRAY(DataTypes.DECIMAL)
  } 
}, { 
  timestamps: true,
  createdAt: true,
  updatedAt: true,
});

Game.belongsTo(User, { as: "firstUser" });
Game.belongsTo(User, { as: "secondUser" });

module.exports = Game;