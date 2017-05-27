var database = [{
  name: 'meAsUser',
  password: '$2a$10$LiliyJwXf93YanqqKpHZQ.jkjdpWbSvlsIUhsa0bcizT5ImwDex/e' // password = mySecret
}];

var user_db = require('../models/user');
var encrypt = require('./encryptModule');

// Authentication and Authorization Middleware


exports.checkAuth = function(req, res, next) {
  console.log(req.session.inSession);
  if (req.session.inSession && req.session.user) {
    next();
  } else {
    res.send('You are not authorized to view this page. Please <a href="/login">logon</a>');
  }
}

exports.checkLogin = function(encPwd, pwd) {

  return (encrypt.comparePassword(pwd, encPwd, function(err, isMatched) {
    if (err) {
      return false
    }
    return isMatched
  }));


}
