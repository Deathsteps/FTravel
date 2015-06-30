var app = require('express')();

// catch 404 and forward to error handler
exports.handle404 = function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// error handlers

if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  exports.handle = function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  };
}else{
  // development error handler
  // will print stacktrace
  exports.handle = function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  };
}