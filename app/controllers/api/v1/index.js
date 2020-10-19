const User = require('../../../models/User.js')
const authenticateToken = require('../../../midlware/authenticateToken');
const checkUserExistsAndActive = require('../../../utilities/checkUserExistsAndActive');

index = (app) => {
  app.get('/api/v1', authenticateToken, checkUserExistsAndActive, (req,res) => {
    User.findAll().then((users => {
      res.json({ 
        users: users
      }); 
    }))
  });     
}

module.exports = index;
