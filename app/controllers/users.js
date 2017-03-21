let bodyParser = require('body-parser');
// let urlencodedParser = bodyParser.urlencoded({ extended: false });
let usersModel = require('../models/users');

function ifSession(req, success, failure) {
  let user = req.session;
  if (usersModel.validateEmail(user.email)) {
    success();
  } else {
    failure();
  }
}

function redirectIfSession(req, res, redirect) {
  ifSession(req, () => res.redirect('/home'), () => res.render(redirect));
}

module.exports = function(app) {
  app.get('/', function(req, res) {
    ifSession(req, () => res.redirect('/home'),
      () => res.redirect('/login'));
  });
  app.get('/login', function(req, res) {
    redirectIfSession(req, res, 'login');
  });
  app.post('/login', function(req, res) {
    let user = req.body;
    if (usersModel.validateEmailPassword(user.email, user.password)) {
      req.session.email = user.email;
      res.redirect('/home');
    } else {
      res.redirect('/login')
    }
  });
  app.get('/logout', function(req, res) {
    delete req.session.email;
    res.redirect('/login');
  });
  app.get('/register', function(req, res) {
    redirectIfSession(req, res, 'register');
  });
  app.post('/register', function(req, res) {
    let newUser = req.body;
    if (usersModel.createUser(newUser.email, newUser.password)) {
      req.session.email = newUser.email;
      res.redirect('/home');
    } else {
      res.redirect('/register');
    }
  });
  app.get('/home', function(req, res) {
    ifSession(req, () => res.render('home'), () => res.redirect('/login'));
  });
};
