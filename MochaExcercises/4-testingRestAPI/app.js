// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');

var app = express(); // define our app using express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'secret_3162735', saveUninitialized:true, resave:true}));

app.use(function (req,res,next){

   if(req.url.substring(0,5) === "/api/"){
      next();
   }
   else{
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
   }
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
