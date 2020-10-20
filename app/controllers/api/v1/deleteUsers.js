const User = require('../../../models/User');
const authenticateToken = require('../../../midlware/authenticateToken');

deleteUsers = (app) => {
  app.delete('/api/v1/delete', authenticateToken, (req, res) => { 
    if (req.query) {
      let userIDs = req.query.id.split(";");
      try {
        User.destroy({
          where: {id: userIDs}
        }).then(
          setTimeout(() => {
            User.findAll().then(
              users => { 
                if (users) {
                  res.json({
                    message: "Delete successful.",
                    users: users
                  }); 
                } else {
                  res.json({
                    token: "",
                    error: "Current user was deleted.",
                    variant: "danger"
                  });
                }
              }
            )
          }, 1000)
        );
      } catch (error) {
        res.json({ error: { message: "Something went wrong on delete action" , data: error }});
      }
    }
  }); 
}

module.exports = deleteUsers;