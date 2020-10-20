const User = require('../../../models/User.js');
const authenticateToken = require('../../../midlware/authenticateToken');

block = (app) => {
  app.patch('/api/v1/block', authenticateToken, (req,res) => {
    let userIDs = req.body.id.split(";");
    User.update({ status: "blocked" }, {where: {id: userIDs}}).then(
      setTimeout(() => {
        User.findAll().then(users => {
          if (users) {
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
