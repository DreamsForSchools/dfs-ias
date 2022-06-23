var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gmapRouter = require('./routes/gmap');
var crudRouter = require('./routes/crud');
var decodeIDToken = require('./authenticateToken');

var app = express();
app.use(express.json({limit: '10mb'}));
app.use(decodeIDToken);
app.use(express.urlencoded({limit: '10mb',extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));


app.use('/users', usersRouter);
app.use('/api', crudRouter);
app.use('/gmap', gmapRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('\n☁️ Dreams For School - Instructor Assignment Sorter\n🏃‍Running on localhost:5000')

module.exports = app;
