const sequelize = require('./sequelize.js');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Game = sequelize.define('game', {
  name:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  moves:{
    type: DataTypes.STRING,
    isAlphanumeric: true
  },
  tags: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
});

Game.belongsTo(User, { 
  as: "firstUser", 
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE' });
Game.belongsTo(User, { 
  as: "secondUser",
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'  });

module.exports = Game;
