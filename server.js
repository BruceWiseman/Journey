// server.js
// load the things we need
var express = require('express');
var app = express();
app.use(express.static("public"));
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
 res.render('pages/home');
});

app.get('/search', function(req, res) {
 res.render('pages/map');
});

app.listen(8080);
console.log('8080 is the magic port');