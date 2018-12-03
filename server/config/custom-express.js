const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      path = require('path'),
      consign = require('consign');

app.set('clientPath', path.join(__dirname, '../..', 'client'));
console.log(app.get('clientPath'));
app.use(express.static(app.get('clientPath')));
app.use(bodyParser.json());

app.use( (req,res,next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

consign({cwd:'app'})
  .include('api')
  .then('routes')
  .into(app);

module.exports = app;
