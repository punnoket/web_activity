var express = require('express');
var router = express.Router();
var playerModel = require('../models/player');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/foot-ball";

router.get('/get_all_player', function (req, res) {
  var before = new Date().valueOf()
  playerModel.find({}, function (err, doc) {
    var time = new Date().valueOf() - before;
    if (err) {
      res.json({
        'error': err
      });
    }
    res.json({
      'success': true,
      'size': doc.length,
      'time': time / 1000,
      'player': doc
    });
  })

});

router.get('/get_player_by_id/:id', function (req, res) {
  var before = new Date().valueOf()
  playerModel.findById(req.params.id, function (err, doc) {
    var time = new Date().valueOf() - before;
    if (err) {
      res.json({
        'error': err
      });
    }
    res.json({
      'success': true,
      'time': time / 1000,
      'size': doc.length,
      'player': doc
    });
  })

});

router.post('/get_player_by_filter/', function (req, res) {
  var before = new Date().valueOf()

  name = req.body.Name;
  Age = req.body.Age;
  Overall = req.body.Overall;
  Potential = req.body.Potential;
  Dribbling = req.body.Dribbling;
  GKdiving = req.body.GKdiving;
  Headingaccuracy = req.body.Headingaccuracy;
  Longpassing = req.body.Longpassing;
  Shortpassing = req.body.Shortpassing;
  Shotpower = req.body.Shotpower;
  Sprintspeed = req.body.Sprintspeed;
  Strength = req.body.Strength;
  Stamina = req.body.Stamina;


  minAge = req.body.minAge;
  minOverall = req.body.minOverall;
  minPotential = req.body.minPotential;
  minDribbling = req.body.minDribbling;
  minGKdiving = req.body.minGKdiving;
  minHeadingaccuracy = req.body.minHeadingaccuracy;
  minLongpassing = req.body.minLongpassing;
  minShortpassing = req.body.minShortpassing;
  minShotpower = req.body.minShotpower;
  minSprintspeed = req.body.minSprintspeed;
  minStrength = req.body.minStrength;
  minStamina = req.body.minStamina;

  pos = req.body.PreferredPositions;

  if (Age == 0)
    Age = 99
  if (Overall == 0)
    Overall = 99
  if (Potential == 0)
    Potential = 99
  if (Dribbling == 0)
    Dribbling = 99
  if (GKdiving == 0)
    GKdiving = 99
  if (Headingaccuracy == 0)
    Headingaccuracy = 99
  if (Longpassing == 0)
    Longpassing = 99
  if (Shortpassing == 0)
    Shortpassing = 99
  if (Shotpower == 0)
    Shotpower = 99
  if (Sprintspeed == 0)
    Sprintspeed = 99
  if (Strength == 0)
    Strength = 99
  if (Stamina == 0)
    Stamina = 99

  var containName = ".*" + name + ".*";
  var containPos = ".*" + pos + ".*";

  playerModel.find({
    Name: { $regex: containName },
    Age: { $gte: minAge, $lte: Age },
    Overall: { $gte: minOverall, $lte: Overall },
    Potential: { $gte: minPotential, $lte: Potential },
    Dribbling: { $gte: minDribbling, $lte: Dribbling },
    GKdiving: { $gte: minGKdiving, $lte: GKdiving },
    Headingaccuracy: { $gte: minHeadingaccuracy, $lte: Headingaccuracy },
    Longpassing: { $gte: minLongpassing, $lte: Longpassing },
    Shortpassing: { $gte: minShortpassing, $lte: Shortpassing },
    Shotpower: { $gte: minShotpower, $lte: Shotpower },
    Sprintspeed: { $gte: minSprintspeed, $lte: Sprintspeed },
    Stamina: { $gte: minStamina, $lte: Stamina },
    Strength: { $gte: minStrength, $lte: Strength },
    PreferredPositions: { $regex: containPos }
  }

    , function (err, doc) {
      var time = new Date().valueOf() - before;
      if (err) {
        res.json({
          'error': err
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.json({
        'success': true,
        'time': time / 1000,
        'size': doc.length,
        'player': doc
      });
    })

});

router.post('/create_player/', function (req, res) {
  var before = new Date().valueOf()

  name = req.body.Name;
  var player = {
    'Name': name
  }
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    db.collection("football-player").insertOne(player, function (err, doc) {
      console.log(doc.ops[0])
      var time = new Date().valueOf() - before;
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        'success': true,
        'time': time / 1000,
        'size': doc.length,
        'player': doc.ops[0]
      });

      db.close();
    });
  });

});

module.exports = router;
