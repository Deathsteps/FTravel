var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

var indexes = require('./routes/index');
var products = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'prototypes')));

app.use('/', indexes);
app.use('/', products);

//app.use('/', require('./middlewares/appHandler'));

var errorHandlers = require('./middlewares/errorHandlers');
app.use(errorHandlers.handle404);
app.use(errorHandlers.handle);

module.exports = app;
