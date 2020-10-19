const authenticateToken = require('../../../midlware/authenticateToken');
const checkUserExistsAndActive = require('../../../utilities/checkUserExistsAndActive');

logout = (app) => {
  app.delete('/api/v1/logout', authenticateToken, checkUserExistsAndActive, (req, res) => {
    res.json({ view: 'login', message: "Logout successful." , variant: "success"});
  });
}

module.exports = logout;