var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));


// app.use(express.bodyParser());
//      the above won't work because bodyParser() has been deprecated
//      you now need to call two methods:
//          app.use(bodyParser.urlencoded());
//          app.use(bodyParser.json());
//          http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);

// mock documents and note
    var docs = {
            1: { 'text': 'this is the document', id: 1 }
        };
    var notes = {
            1: {
                1: { text: "this is a note", id: 1 }
                , 2: { text: "this is another note", id: 2 }
            }
        };
    var d = 2;
    var n = 2;

// router for documents
    app.get('/documents', function(req, res){
        var results = [];
        for (var doc in docs){
            if (docs.hasOwnProperty(doc)){
                results.push(docs[doc]);
            }
        }
        res.json(results);
    });

    app.post('/documents', function(req, res){
        var doc = req.body;
        console.log('this is what the server get from req.body: ', doc)
        doc.id = d++;
        docs[doc.id] = doc;
        res.json(doc);
        // When sending your post request, make sure you have
        // the content-type in request header set:
        // curl -d '{"good_food":["pizza"]}' -H 'content-type:application/json' "http://www.example.com/your_endpoint"
        // Ref:
        // http://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
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
