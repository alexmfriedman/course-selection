let users = []; // best way to securely store client information!

module.exports.createUser = function(email, password) {
  if (module.exports.validateEmail(email)) {
    return false;
  }
  users.push({email: email, password: password});
  console.log(users);
  return true;
};

module.exports.deleteUser = function(email) {
  users = users.filter(x => x.email !== email);
  //don't actually use this, this is awful but looks cool :)
};

module.exports.getUsers = function() {
  return users;
};

module.exports.validateEmailPassword = function(email, password) {
  return users.map(user => user.email === email && user.password === password)
    .reduce((x, y) => x || y, false);
};

module.exports.validateEmail = function(email) {
  return users.map(user => user.email === email)
    .reduce((x, y) => x || y, false);
};
