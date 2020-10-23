const Game = require('../../../models/Game.js')
const authenticateToken = require('../../../midlware/authenticateToken');
tags = (app) => {
  app.get('/api/v1/tags', authenticateToken, (req,res) => {
    Game.findAll({attributes: ['tags']}).then((games => {
      console.log()
      let splittedTags = games.map(game => game.dataValues.tags.split("|"));
      let uniqueTags = Array.from(new Set([].concat(...splittedTags)));
      
      res.json({
        suggestions: uniqueTags
      });
    }))
  });
}

module.exports = tags;