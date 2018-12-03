const api = require('../api');

module.exports = app => {

  app.get('/calcs/day', api.calcsDay);
  app.get('/calcs/yesterday', api.calcsYesterday);
  app.get('/calcs/old', api.calcsOld);
  app.post('/calc', api.registerCalc);

};
