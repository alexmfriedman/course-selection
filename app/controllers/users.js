var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get('/register', function(req, res) {
    res.render('register');
  });

  app.post('/register', urlencodedParser, function(req, res) {
    console.log(req.body);
  });
};
