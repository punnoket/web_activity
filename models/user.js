var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  name: {
    type: String
  },
  student_id: {
    type: Number
  },
  password: {
    type: String
  },
  username: {
    type: String
  },
  faculty: {
    type: String
  }
});
module.exports = mongoose.model('user', schema);
