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
//
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
              1: { 'text': 'document 1', id: 1 }
            , 2: { 'text': 'document 2', id: 2 }
        };
    var notes = {
              1: {  1: { text: "document 1, note 1.1", id: 1 }
                  , 2: { text: "document 1, note 1.2", id: 2 }
                  , 3: { text: "document 1, note 1.3", id: 3 } }
            , 2: {  1: { text: "document 2, note 2.1", id: 1 }
                  , 2: { text: "document 2, note 2.2", id: 2 } }
        };
    var d = 3;  // counter for next document
    var n = 3;  // counter for next note

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
        // validation goes here if these is a real application
        console.log('this is what the server get from req.body: ', doc);
        doc.id = d++;
        docs[doc.id] = doc;
        res.json(doc);
        // When sending your post request, make sure you have
        // the content-type in request header set:
        // curl -d '{"good_food":["pizza"]}' -H 'content-type:application/json' "http://www.example.com/your_endpoint"
        // Ref:
        // http://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
        //
        // Also, make sure your json is well form: surround key and value
        // in double quote.
    });

    app.put('/documents/:id', function(req, res){
        console.log('PUT::  req.parms: ', req.params.id,  'req.body: ', req.body);
        docs[req.params.id] = req.body;
        res.json(req.body);
    });


// router for note
    app.get('/documents/:did/notes', function(req, res){
        console.log("get('/documents/:did/notes)' --> ::  req.params: ", req.params,  'req.body: ', req.body);
        // console.log("get('/document/:did/notes) --> req.route: ", req.route);
        var results = [];
        var n = notes[req.params.did];
        console.log('n: ', n);
        for (var note in n){
            if (n.hasOwnProperty(note)){
                results.push(n[note]);
            }
        }
        res.json(results);
    });


    app.post('/documents/:did/notes', function(req, res){
        console.log("get('/documents/:did/notes) --> ::  req.params: ", req.params,  'req.body: ', req.body);
        var note = req.body;
        var id = req.params.did;
        note.id = n++;
                                                console.log('[1a]', notes)
        if (!notes[id]){ notes[id] = {}; }
                                                console.log('[2a]', notes)
        notes[id][note.id] = note;
                                                console.log('[3a]', notes)
        res.json(note);
    });
/*
    app.post('/documents/:did/notes/:nid', function(req, res){
        console.log("get('/documents/:did/notes/:nid) --> ::  req.params: ", req.params,  'req.body: ', req.body);
        var note = req.body;
        var id = req.params.did;
        var nid = req.params.nid;
        note.id = n++;
                                                console.log('[1]', notes)
        if (!notes[id]){ notes[id] = {}; }
                                                console.log('[2]', notes)
        notes[id][nid] = note;
                                                console.log('[3]', notes)
        res.json(note);
        // curl -d '{"a":"a"}' -H 'content-type:application/json' "http://localhost:3000/documents/3/notes/1"
    });
*/
    app.put('/documents/:did/notes/:nid', function(req, res){
        notes[req.params.did][req.params.nid] = req.body;
        // curl -X put -d '{"a":"a"}' -H 'content-type:application/json' "http://localhost:3000/documents/3/notes/1"
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
