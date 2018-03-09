var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  No: {
    type: Number
  },
  
  Age: {
    type: Number
  },
  Photo: {
    type: String
  },
  Nationality: {
    type: String
  },
  Flag: {
    type: String
  },
  Overall: {
    type: Number
  },
  Potential: {
    type: Number
  },
  Club: {
    type: String
  },
  ClubLogo: {
    type: String
  },
  Value: {
    type: String
  },
  Wage: {
    type: String
  },
  CAM: {
    type: Number
  },
  CB: {
    type: Number
  },
  CDM: {
    type: Number
  },
  CF: {
    type: Number
  },
  CM: {
    type: Number
  },
  ID: {
    type: Number
  },
  LAM: {
    type: Number
  },
  LB: {
    type: Number
  },
  LCB: {
    type: Number
  },
  LCM: {
    type: Number
  },
  LDM: {
    type: Number
  },
  LF: {
    type: Number
  },
  LM: {
    type: Number
  },
  LS: {
    type: Number
  },
  LW: {
    type: Number
  },
  LWB: {
    type: Number
  },
  PreferredPositions: {
    type: String
  },
  RAM: {
    type: Number
  },
  RB: {
    type: Number
  },
  RCB: {
    type: Number
  },
  RCM: {
    type: Number
  },
  RDM: {
    type: Number
  },
  RF: {
    type: Number
  },
  RM: {
    type: Number
  },
  RF: {
    type: Number
  },
  RS: {
    type: Number
  },
  RWB: {
    type: Number
  },
  ST: {
    type: Number
  }
});
module.exports = mongoose.model('football-player', schema,'football-player');
