const Game = require('../../../models/Game.js')
const authenticateToken = require('../../../midlware/authenticateToken');
index = (app) => {
  app.get('/api/v1', authenticateToken, (req,res) => {
    Game.findAll().then((games => {
      res.json({
        games: games
      });
    }))
  });
}

module.exports = index;
