routes = (app, io) => {
  require('../controllers/api/v1/index')(app);
  require('../controllers/api/v1/signin')(app);
  require('../controllers/api/v1/signup')(app);
  require('../controllers/api/v1/logout')(app);
  require('../controllers/api/v1/games')(app);
  require('../controllers/api/v1/testSocket')(app, io);
}

module.exports = routes;