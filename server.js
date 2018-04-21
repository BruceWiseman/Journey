// server.js
// load the things we need

const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/userprofiles";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

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

//var username = null;

//connection to the mongo db, ts sets the variable db as the database
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

//==========================GET ROUTES = display pages==========================

// use res.render to load up an ejs view file
// ====home page
app.get('/', function(req, res) {
 res.render('pages/home');
});

//render user policy
app.get('/userpolicy', function(req, res) {
 res.render('pages/userpolicy');
});

//==== search page
app.get('/search', function(req, res) {
 res.render('pages/map');
});

//==== profile page
app.get('/profile', function(req, res) {

  if(!req.session.loggedin){res.redirect('/');return;}

  //get the requested user based on their username,
  //console.log(JSON.stringify(username))

  //this query finds the first document in the array with that username.
  //Because the username value sits in the login section of the user data we use login.username
  db.collection('people').findOne({"login.username": req.session.user.login.username}, function(err, result) {
    if (err) throw err;

    res.render('pages/profile',{user : result});
  });
});

//edit profile page
app.get("/edit",function(req,res) {
  db.collection('people').findOne({"login.username": req.session.user.login.username}, function(err, result) {
    if (err) throw err;
    res.render("pages/edit",{user : result});
  });
});

//logout route
app.get('/logout', function(req, res) {
  if(!req.session.loggedin){res.redirect('/');return;}
  console.log(JSON.stringify(req.session.user.login.username),"logged out, bye!");
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/');
});


//=========================POST ROUTES = deal with data=========================

//Register the user

app.post('/adduser', function(req, res) {
  //check we are logged in
  //if(!req.session.loggedin){res.redirect('/');return;}

  //we create the data string from the form components that have been passed in

var datatostore = {
  "name":{"first":req.body.first,"last":req.body.last},
  "login":{"username":req.body.email,"password":req.body.psw},
  "email":req.body.email,
  "registered":Date(),
  "avatar":req.body.avatar,
  "favourites":[]
};


//once created we just run the data string against the database and all our new data will be saved/
  db.collection('people').save(datatostore, function(err, result) {
    if (err) throw err;
    console.log("User",JSON.stringify(req.body.email),"was added to database!");
    //when complete redirect to the index
    res.redirect('/')
  })
});

//Login user

//the dologin route deals with the data from the login screen.
//the post variables, username and password come from the login form
app.post('/dologin', function(req, res) {
  //console.log(JSON.stringify(req.body))
  var uname = req.body.uname;
  var pword = req.body.psw;

  db.collection('people').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('/');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      req.session.loggedin = true;
      //set the result as the current session user
      req.session.user = result;

      //username = result.login.username;

      console.log(JSON.stringify(req.session.user.login.username), "logged in, hello!");
      res.redirect('/') }
    //otherwise send them back to login
    else{res.redirect('/')}

  });
});

//route to deal with user profile edits
app.post('/doedit', function(req, res) {

  //select the current session user and update the info
  db.collection("people").update({"login.username": req.session.user.login.username},{$set:{
      "name":{"first":req.body.first,"last":req.body.last},
      "login":{"username":req.body.email,"password":req.body.psw},
      "email":req.body.email,
      "avatar":req.body.avatar
    }});
    //confirm that a user was edited
    console.log("Updated user",JSON.stringify(req.session.user.login.username));
    //render the profile page
    res.redirect("/profile");
  });

//a route to add favourite to user profile
app.post('/addfavourite', function(req, res) {

  //check if user is logged in
  if(!req.session.loggedin){res.redirect('back');return;}

  db.collection('people').findOne({"login.username":req.session.user.login.username}, function(err, result) {
    db.collection("people").update({"_id": result._id},{$push:{"favourites" : {"place":{"name":req.body.resultHead, "address":req.body.resultPara, "category":req.body.categorySelect }}}});
  });

  res.redirect("/profile");
});
