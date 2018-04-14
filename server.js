// server.js
// load the things we need

var MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
var url = "mongodb://localhost:27017/userprofiles";
var express = require('express'); //npm install express
var session = require('express-session'); //npm install express-session
var bodyParser = require('body-parser'); //npm install body-parser
var app = express();

//use sessions
app.use(session({ secret: 'example' }));

app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

//use body parser
app.use(bodyParser.urlencoded({
  extended: true
}));

var db;

//connection to the mongo db, ts sets the variable db as the database
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

//==========================GET ROUTES = display pages==========================

// use res.render to load up an ejs view file
// home page
app.get('/', function(req, res) {
 res.render('pages/home');
});

// search page
app.get('/search', function(req, res) {
 res.render('pages/map');
});

// profile page
app.get('/profile', function(req, res) {
 res.render('pages/profile');
});

//=========================POST ROUTES = deal with data=========================

//Register the user

app.post('/adduser', function(req, res) {
  //check we are logged in
  if(!req.session.loggedin){res.redirect('/');return;}

  //we create the data string from the form components that have been passed in

var datatostore = {
  "name":{"first":req.body.first,"last":req.body.last},
  "login":{"username":req.body.email,"password":req.body.psw},
  "email":req.body.email};


//once created we just run the data string against the database and all our new data will be saved/
  db.collection('people').save(datatostore, function(err, result) {
    if (err) throw err;
    console.log(datastore);
    //when complete redirect to the index
    res.redirect('/')
  })
});
