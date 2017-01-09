var express = require('express');
var bodyParser = require('body-parser');
var usersController = require('./controllers/users');
var sessions = require('express-session');
var bcrypt = require('bcryptjs');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//middlewear
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({
  cookieName: 'session',
  secret: 'efihwifhai;elfhieofhseiofheoifha;efhioesh',
    //eventually make real secret and store somewhere less awful :)
  // duration: 24 * 60 * 60 * 1000,
  // activeDuration: 24 * 60 * 60 * 1000,
  resave: false, //look into these in the future
  saveUninitialized: false,
}));

// app.use(function(req, res, next)) {
//   // if (user)
// }

//template engine
app.set('view engine', 'ejs');

//controllers
usersController(app);

app.listen(3000);
