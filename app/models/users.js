var users = [];

module.exports.createUser = function(email, password) {
  users.push({email: email, password: password});
  //check for duplicates
}

module.exports.deleteUser = function(email) {
  users.filter(x => x.email !== email);
  //don't actually use this, this is awful but looks cool :)
}
