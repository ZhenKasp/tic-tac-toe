routes = (app) => {
  require('../controllers/api/v1/index')(app);
  require('../controllers/api/v1/signin')(app);
  require('../controllers/api/v1/signup')(app);
  require('../controllers/api/v1/logout')(app);
  require('../controllers/api/v1/deleteUsers')(app);
  require('../controllers/api/v1/block')(app);
  require('../controllers/api/v1/unblock')(app);
}

module.exports = routes;