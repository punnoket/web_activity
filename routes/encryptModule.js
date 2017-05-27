var bcrypt = require('bcrypt');

var encrypt = {
  encryptPwd: function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err)
        return callback(err);

      bcrypt.hash(password, salt, function(err, hash) {
        return callback(err, hash);
      });

    });
  },
  comparePassword: function(password, encPwd, callback) {

    return callback(null, bcrypt.compareSync(password, encPwd));
    /*    bcrypt.compare(password, encPwd, function(err, isPwdMatched) {
          if (err)
            return callback(err);
          return callback(null, isPwdMatched);
        });
    */
  }
}

module.exports = encrypt;
