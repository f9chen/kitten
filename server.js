var env = ( function () {
  var Habitat = require('habitat');
  Habitat.load();
  return new Habitat();
}() );

var fs = require('fs');

var common = new (require('./static/common'))();
common.env = env;
common.fs = fs;
require('./common_server')(common);
var Log = common.log(__filename, 'server');

// If you make changes to the .env file, you must update expected_env_version to match!
var expected_env_version = '0.0.1';
var env_version = env.get('ENV_VERSION');
if (!env_version || env_version != expected_env_version) {
  var err = "Error: ENV_VERSION is mismatched!  Make sure .env is up-to-date!" +
            "\nExpected .env Version: \t" + expected_env_version +
            "\nActual .env Version: \t" + env_version;
  Log.console(err, 2);
  return;
}

var express = require('express');
var app = express();
app.use(require('morgan')("combined")); // logger
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/jquery', express.static(__dirname + '/node_modules/jquery', { index: false }));
app.use('/materialize-css', express.static(__dirname + '/node_modules/materialize-css', { index: false }));
app.use('/react-coast/js', express.static(__dirname + '/node_modules/react-coast/js', { index: false }));
app.use('/react-coast/css', express.static(__dirname + '/node_modules/react-coast/rc-gen/css', { index: false }));
app.use('/palette', express.static(__dirname + '/node_modules/palette-css/pl-gen/css', { index: false }));
app.use(express.static(__dirname + '/static', { index: false }));

var helmet = require('helmet');
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.noCache());
app.use(require('method-override')());
app.use(require('cookie-parser')(env.get('COOKIE_SECRET')));

app.use(require('express-session')({
  secret: env.get('SESSION_SECRET'),
    /*
  cookie: {
    proxy: true,
    httpOnly: true,
    secure: common.isDev,
  },
  */
  resave: true,
  saveUninitialized: false,
}));

var mustacheExpress = require('mustache-express');
app.set('views', __dirname + '/partials');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

common.middleware = {};
common.middleware.restHeaders = require('./middleware/restHeaders')();
common.middleware.basicAuth = require('./middleware/basicAuth')();

var server = app.listen(env.get('HTTP_PORT'), function () {
  Log.console("Listening on port " + server.address().port.toString() + " for HTTP");
});

app.get('/favicon.png',
  function (request, response) {
    response.sendFile('static/img/favicon.png', {root: __dirname});
  });

app.use(common.middleware.basicAuth);

app.get(common.routes.homepage,
  function(request, response) {
    //response.redirect(common.routes.example);
    response.sendFile('static/simple.html', {root: __dirname});
  });

app.get(common.routes.test,
  function(request, response) {
    console.log('test0');
    response.render('test_partial', {
      test_value: "Hello World!",
    });
  });

//app.use(common.routes.public, require('./routes/public/public')(common, express.Router()));
