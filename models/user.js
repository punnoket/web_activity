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
  },
  history_activity: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'activity'
  }]
});
module.exports = mongoose.model('user', schema);
