var thinky = require('thinky')({});
var type = thinky.type;
var bcrypt = require('bcrypt');

var User = thinky.createModel('User', {
  email: type.string(),
  hash: type.string(),
  attempts: type.number().default(0)
});

User.pre('save', function(next) {
  var password = this.password || '';
  delete this.password;
  if (!this.hash) {
    this.hash = bcrypt.hashSync(password, 10);
  }
  return next();
});

User.define('public', function() {
  delete this.hash;
  return this;
});

User.define('authenticate', function(password) {
  if (bcrypt.compareSync(password, this.hash) && this.attempts < 20) {
    this.attempts = 0;
    this.save();
    delete this.hash;
    return this;
  }
  else {
    this.attempts++;
    this.save();
    return false;
  }
});

module.exports = User;
