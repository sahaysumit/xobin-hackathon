
var d = require('domain').create();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require("fs");
var json2csv = require('json2csv');
var MongoClient = require('mongodb').MongoClient;
var libxmljs = require("libxmljs");




var app = express();

xml2js = require('xml2js');
fs = require('fs');

var parser = new xml2js.Parser();
fs.readFile( './dumplist/Badges.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        badges = result;
    });
});
fs.readFile( './dumplist/Comments.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
       comments = result;
    });
});
fs.readFile( './dumplist/PostHistory.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        PostHistory = result;
    });
});
fs.readFile( './dumplist/PostLinks.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        PostLinks = result;
    });
});
fs.readFile( './dumplist/Posts.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        Posts = result;
        // console.log(JSON.stringify(Posts))
    });
});
fs.readFile( './dumplist/Tags.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        Tags = result;
    });
});
fs.readFile( './dumplist/Votes.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        Votes = result;
    });
});
fs.readFile( './dumplist/Users.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        Users = result;
        // console.log(JSON.stringify(Users));
    });
});


app.use('/posts', function(req, res){
  res.locals.posts = Posts;
  res.render("Posts.jade")
});
app.use('/users', function(req, res){
  res.locals.users = Users;
  res.render("Users.jade");
});




// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
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
console.log("requst is "+req);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// production error handler
// no stacktraces leaked to user

d.on('error', function(err) {
  // handle the error safely
  cosole.log(err);
});

// catch the uncaught errors in this asynchronous or synchronous code block
d.run(function() {
  // the asynchronous or synchronous code that we want to catch thrown errors on
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});

module.exports = app;