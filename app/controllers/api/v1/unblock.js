const User = require('../../../models/User.js');
const authenticateToken = require('../../../midlware/authenticateToken');
const checkUserExistsAndActive = require('../../../utilities/checkUserExistsAndActive');

unblock = (app) => {
  app.patch('/api/v1/unblock', authenticateToken, checkUserExistsAndActive, (req,res) => {
    let userIDs = req.body.id.split(";");
    User.update({ status: "active" }, {where: {id: userIDs}}).then(
      setTimeout(() => {
        User.findAll()
        .then(users => {
          res.json({ 
            users: users, 
            message: "Unblock successful.",
            variant: "success"
          }); 
        })
      }, 1000)
    );
  });     
};

module.exports = unblock;