let express = require('express');
let bodyParser = require('body-parser');
let usersController = require('./controllers/users');
let sessions = require('express-session');
// let bcrypt = require('bcryptjs');

let app = express();
// let urlencodedParser = bodyParser.urlencoded({ extended: false });

//middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({ //TODO: session info must be stored in a db
  // cookieName: 'session',
  secret: 'efihwifhai;elfhieofhseiofheoifha;efhioesh',
  //eventually make real secret and store somewhere less awful :)
  // duration: 24 * 60 * 60 * 1000,
  // activeDuration: 24 * 60 * 60 * 1000,
  resave: false, //look into these in the future
  saveUninitialized: false
}));

// app.use(function(req, res, next)) {
//   // if (user)
// }

//template engine
app.set('view engine', 'ejs');

//controllers
usersController(app);

app.listen(3000, () => console.log('listening on port 3000'));
