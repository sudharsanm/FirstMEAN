var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");

var routes = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');
var common = require('./routes/common');
var mongojs = require("mongojs");
//var db = mongojs('TrackExpense');
var db = mongojs("mongodb://root:mongodb1234@ds041571.mongolab.com:41571/myexpensedb");
//var mycollection = db.collection('Category_ef9dd82b-12e8-4a93-a320-fd515d21e5a0');
var mycollection = db.collection('Category');

var trackCollection = db.collection("tracks");

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
app.use(express.static(path.join(__dirname, '/public')));



//app.use('/', routes);
//app.use('/users', users);


app.get('/Track',function(req, res){
  res.sendFile(path.join(__dirname, 'public/Track.html'));
  //app.use(express.static(path.join(__dirname, '/public/Track.html')));
});

app.get('/Detail',function(req, res){
  res.sendFile(path.join(__dirname, 'public/TrackDetail.html'));
  //app.use(express.static(path.join(__dirname, '/public/Track.html')));
});


app.get('/TrackSum/:id',function(req, res){
  console.log("Inside TrackSum");
  var id = req.params.id;
  var year = id.split('-')[0];
  var month = id.split('-')[1];
  var nextMonth = parseInt(month);
  var nextYear = parseInt(year)
  if(nextMonth == 12){
    nextMonth = 1;
    nextYear =nextYear + 1; 
  }
  else{
    nextMonth = nextMonth + 1; 
  }
  
  if (nextMonth<10){
         nextMonth="0" + nextMonth;
         };
   
  trackCollection.aggregate([{$match : {TrackDate : {$gte : year + "-"+ month +"-01T00:00:00Z", $lt : nextYear + "-"+ nextMonth +"-01T00:00:00Z" }}}, 
    {$group: { _id : "1", "Total" : {$sum: "$Amount" }}}],
  function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
  //app.use(express.static(path.join(__dirname, '/public/Track.html')));
});

app.get('/CategoryWiseTrack/:id',function(req, res){
  console.log("Inside CategoryWiseTrack");
  var id = req.params.id;
  var year = id.split('-')[0];
  var month = id.split('-')[1];
  var nextMonth = parseInt(month);
  var nextYear = parseInt(year)
  if(nextMonth == 12){
    nextMonth = 1;
    nextYear =nextYear + 1; 
  }
  else{
    nextMonth = nextMonth + 1; 
  }
  if (nextMonth<10){
         nextMonth="0" + nextMonth;
         };
         
  trackCollection.aggregate([{$match : {TrackDate : {$gte : year + "-"+ month +"-01T00:00:00Z", $lt : nextYear + "-"+ nextMonth +"-01T00:00:00Z" }}}, 
    {$group: { "_id" : "$Category", "Total" : {$sum: "$Amount" }}}],
  function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
  //app.use(express.static(path.join(__dirname, '/public/Track.html')));
});



app.get('/Tracks',function(req, res){
  console.log('Inside Tracks')
  res.json('Inside Tracks');
});


app.post('/Track',function(req, res){
  console.log('Inside POST')
  console.log(req.body);
  trackCollection.insert(req.body, function(err, docs) {
    
    console.log(docs);
    res.json(docs);  
  })
  
});

app.get('/categories',function(req, res){
  console.log('Inside GET')
  mycollection.find(function(err,docs)
  {
    console.log(docs);
    res.json(docs);  
  }
  );
  
});


app.get('/categoriesForCombo',function(req, res){
  console.log('Inside GET')
  mycollection.find({},{_id:0,CategoryName:1},function(err,docs)
  {
    console.log(docs);
    res.json(docs);  
  }
  );
  
});


app.get('/categories/:id',function(req, res){
  console.log('Inside GET ID');
  var id = req.params.id;
  mycollection.findOne({_id: mongojs.ObjectId(id)},function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
  console.log(id);
});

app.post('/categories',function(req, res){
  console.log('Inside POST')
  console.log(req.body);
  mycollection.insert(req.body, function(err, docs) {
    
    console.log(docs);
    res.json(docs);  
  })
  
});

app.delete('/categories/:id',function(req, res){
  console.log('Inside DELETE');
  var id = req.params.id;
  mycollection.remove({_id: mongojs.ObjectId(id)},function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
  console.log(id);
});

app.put('/categories/:id',function(req, res){
  var id = req.params.id;
  console.log(req.body.CategoryName);
  mycollection.findAndModify({query : {_id: mongojs.ObjectId(id)},
      update: {$set: {CategoryName : req.body.CategoryName, IsActive : req.body.IsActive }},
      new: true}, function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});


app.delete('/trackDetail/:id',function(req, res){
  console.log('Inside DELETE Track');
  var id = req.params.id;
  trackCollection.remove({_id: mongojs.ObjectId(id)},function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
  console.log(id);
});

app.get('/trackDetail',function(req, res){
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  
  var year = query["MonthYear"].split('-')[0];
  var month = query["MonthYear"].split('-')[1];
  
  console.log('Inside trackDetail Get');
  trackCollection.find({TrackDate : {$gte : year + "-"+ month +"-01T00:00:00Z", $lt : common.getNextMonthYear(month, year) + "-"+ common.getNextMonth(month) +"-01T00:00:00Z" }},function(err,docs)
  {
    console.log(docs);
    res.json(docs);  
  }
  );
});

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
