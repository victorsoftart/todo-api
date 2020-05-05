// call the packages we need
var express         = require('express');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var cookieParser 	  = require('cookie-parser');
var methodOverride  = require('method-override');
var http 			      = require('http');
var https 			    = require('https');
var app             = express();

var port = process.env.PORT || 3000; // set our port

// configure body parser
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({limit: '500mb', extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '500mb'}));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
// app.use(express.static(__dirname + '/public'));

// CREATE OUR ROUTER
var router = express.Router();
try {
  mongoConnectionString = 'mongodb://localhost:27017/TodoDB';
} catch(err) {
  console.log(err);
}
require('./modules/routes.js')(router);

app.get('', function(req, res) {
  res.json({status: 200, msg: 'Welcome Todo App API server!'});
});

app.use('/', router);

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app;               // export app

