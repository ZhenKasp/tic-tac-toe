const User = require('../models/User');

checkUserExistsAndActive = (req, res, next) => {
  (async () => {
    try {
      await User.findOne({ where: {email: req.body.email} })
      .then(user => {
        if (user && user.status == "active") {
          req.body.status = user.status;
          next(); 
        } else {
          return res.json({ 
            error: "User doesn't exist or blocked.", 
            token: "",
            variant: "danger" 
          }).status(403);
        }
      });
    } catch(error) {
      return res.json({ 
        token: "",
        error: error.message, 
        variant: "danger" 
      }).status(403);
    }; 
  })();
};

module.exports = checkUserExistsAndActive;