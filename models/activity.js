var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  location: {
    type: String
  },
  result_vote: {
    type: String
  },
  key: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  exprie: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  join: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  choice: [{
    choice: String,
    score: Number
  }]
});
module.exports = mongoose.model('activity', schema);
