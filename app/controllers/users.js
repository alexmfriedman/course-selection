var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var usersModel = require('../models/users');

function sessionHandler(req, validCookie, invalidCookie, noCookie) {
  if (req.session && req.session.email) {
    if (usersModel.validateEmail(req.session.email)) {
      validCookie();
    } else {
      invalidCookie();
    }
  } else {
    noCookie();
  }
}

module.exports = function(app) {
  app.get('/', function(req, res) {
    sessionHandler(req, function() {
      res.redirect('/home');
    }, function() {
      res.session.reset();
      res.redirect('/login');//eventually add a home page with fun stuffs
    }, function() {
      res.redirect('/login');
    });
  });

  app.get('/register', function(req, res) {
    sessionHandler(req, function() {
      res.redirect('/home');
    }, function() {
      req.session.destroy();req.session = null;
      res.render('register');
    }, function() {
      res.render('register');
    });
  });

  app.post('/register', urlencodedParser, function(req, res) {
    var newUser = req.body;
    usersModel.createUser(newUser.email, newUser.password);
    console.log(usersModel.getUsers());
    req.session.destroy();req.session = {};
    req.session.email = newUser.email; //need more info?
    res.redirect('/home');
  });

  app.get('/login', function(req, res) {
    sessionHandler(req, function() {
      res.redirect('/home');
    }, function() {
      req.session.destroy();req.session = null;
      res.render('login');
    }, function() {
      res.render('login');
    });
  });


  app.post('/login', urlencodedParser, function(req, res) {
    var user = req.body;
    console.log(user.email + ", " + user.password);
    if (usersModel.validateEmailPassword(user.email, user.password)) {
      console.log('found user');
      req.session.destroy();req.session = {};
      req.session.email = user.email; //change to store more info?
      res.redirect('/home');
    } else {
      console.log('invalid input');
      res.redirect('/login');
    }
    console.log(usersModel.getUsers());
  });

  app.get('/home', function(req, res) {
    sessionHandler(req, function() {
      res.render('home');
    }, function() {
      req.session.destroy();req.session = null;
      res.redirect('/login');
    }, function() {
      res.redirect('/login');
    });
  });
};
