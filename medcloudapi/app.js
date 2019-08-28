var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var pacientsRouter = require('./routes/pacients');

var app = express();

var http = require('http');
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({});
  }
  next();
});

//Database connection
app.use(function(req, res, next){
  res.locals.connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'1234',
    database:'medcloud',
  });
  res.locals.connection.connect();
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pacients', pacientsRouter);

// catch 404 and forward to error handler'
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

module.exports = app;
var server = http.createServer(app);
server.listen(3001);
