const User = require('../../../models/User.js');
const Game = require('../../../models/Game.js');
const authenticateToken = require('../../../midlware/authenticateToken');

games = (app) => {
  app.post('/api/v1/games', authenticateToken, (req,res) => {
    const game = {
      name: req.body.name || `${req.body.username}'s game`,
      moves: req.body.moves || "0;0;0;0;0;0;0;0;0",
      firstUserId: req.body.id,
      firstUserName: req.body.username,
      tags: req.body.tags
    };

    (async () => {
      try {
        (async () => {
          try { 
            const newGame = await Game.create(game);
            await newGame.save();
    
            res.json({ message: "Create game successful" , variant: "success", gameParams: newGame, firstUser: req.body.username});
          } catch (error) {
            res.json({ error: error.errors[0].message, variant: "danger"}).status(400); 
          }  
        })();
      } catch (error) {
        res.json({ error: error.errors[0].message, variant: "danger"}).status(400); 
      }  
    })();
  }); 
};

module.exports = games;
