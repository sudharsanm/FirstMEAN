var express = require('express');
var router = express.Router();

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");


var mongojs = require("mongojs");
var db = mongojs('TrackExpense');
var mycollection = db.collection('Category_ef9dd82b-12e8-4a93-a320-fd515d21e5a0');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '/public')));


/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond to Catogry');
//});



module.exports = router;
