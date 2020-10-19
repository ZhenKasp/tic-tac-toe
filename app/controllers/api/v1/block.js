const User = require('../../../models/User.js');
const authenticateToken = require('../../../midlware/authenticateToken');
const checkUserExistsAndActive = require('../../../utilities/checkUserExistsAndActive');
const isCurrentUserAvailable = require('../../../utilities/isCurrentUserAvailable');

block = (app) => {
  app.patch('/api/v1/block', authenticateToken, checkUserExistsAndActive, (req,res) => {
    let userIDs = req.body.id.split(";");
    User.update({ status: "blocked" }, {where: {id: userIDs}}).then(
      setTimeout(() => {
        User.findAll().then(users => {
          
          if (isCurrentUserAvailable(users, req.body.email)) {
            res.json({ 
              users: users, 
              message: "Block successful.",
              variant: "success"
            }); 
          } else {
            res.json({
              token: "",
              error: "Current user was blocked.",
              variant: "danger"
            });
          }
          
        })
      }, 1000)
    )
  });     
}

module.exports = block;
