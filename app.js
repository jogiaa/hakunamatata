var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressWinston = require('express-winston');
var winston = require('winston');
var app = express();
var passport = require('passport');

/*
*Config files
*/
var db = require('./utils/dbmanager.js');
var winstonConfig = require('./config/winston.config.js');

/*
*App routes
*/

var users = require('./routes/UsersController');
var bears = require('./routes/BearsController');


// app.use(function(req,res,next){

//     req.db = db;
//     next();
// });

// Use the passport package in our application
app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          level : winstonConfig.level ,
          json: winstonConfig.json_console,
          colorize : winstonConfig.colorize,
          label : winstonConfig.label_server,
          handleExceptions: winstonConfig.handleExceptions,
          exitOnError: winstonConfig.exitOnError
          
        }),
        new winston.transports.File({
            level: winstonConfig.level,
            json: winstonConfig.json_file,
            filename: winstonConfig.filename_server,
            handleExceptions: winstonConfig.handleExceptions,
            exitOnError: winstonConfig.exitOnError,
            maxsize: winstonConfig.maxsize, 
            maxFiles: winstonConfig.maxFiles,
            label : winstonConfig.label_server
        })
      ],
      statusLevels : winstonConfig.statusLevels,
      meta: winstonConfig.meta_file, 
      msg: winstonConfig.msg,
      expressFormat: winstonConfig.expressFormat,
      colorStatus: winstonConfig.colorStatus, 
      ignoreRoute: function (req, res) { return false; } 
    }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/bears' , bears);

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
