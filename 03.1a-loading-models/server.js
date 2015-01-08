var   express = require('express')
    , app = express()
    , bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); // This allows for subpath content serving

var things = [
      { id: 1, text: "one"}
    , { id: 2, text: "two"}
    , { id: 3, text: "three"}
    , { id: 4, text: "four"}
]

app.get('/', function(req, res){
    res.render('index.jade', { things: JSON.stringify( things ) });
}).listen(3300);

