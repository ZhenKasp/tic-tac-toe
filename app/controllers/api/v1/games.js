const User = require('../../../models/User.js');
const Game = require('../../../models/Game.js');
const authenticateToken = require('../../../midlware/authenticateToken');

games = (app) => {
  app.post('/api/v1/games', authenticateToken, (req,res) => {
    let game = {};
    (async () => {
      try { 
        User.findOne({where: {email: req.body.email}}).then(user => {
          game = {
            name: `${user.username} game`,
            moves: "0;0;0;0;0;0;0;0;0",
            firstUserId: user.id
          }
        });
        setTimeout(() => {
          (async () => {
            try { 
              const newGame = await Game.create(game);
              await newGame.save();
      
              res.json({  message: "Create game successful" , variant: "success", game: newGame});
            } catch (error) {
              res.json({ error: error.errors[0].message, variant: "danger"}).status(400); 
            }  
          })();
        }, 1000);
      } catch (error) {
        res.json({ error: error.errors[0].message, variant: "danger"}).status(400); 
      }  
    })();
    
    // (async () => {
    //   try { 
    //     const newGame = await Game.create(game).then();
    //     await newGame.save();
    //     console.log("newGame  :", newGame)

    //     res.json({  message: "Create game successful" , variant: "success", game: newGame});
    //   } catch (error) {
    //     res.json({ error: error.errors[0].message, variant: "danger"}).status(400); 
    //   }  
    // })();
  }); 
};

module.exports = games;
