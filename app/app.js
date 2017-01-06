var express = require('express');
var bodyParser = require('body-parser');
var usersController = require('./controllers/users');
// var session = require('express-session');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.use(session({
//   //some stuff
// }));





//template engine
app.set('view engine', 'ejs');

//controllers
usersController(app);

app.listen(3000);
