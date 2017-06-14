var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var ActivityModel = require('../models/activity');
var auth = require('./authentication');
var encrypt = require('./encryptModule');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');


var checkauth = false
var idUser
var username

function checkAuth(req, res, next) {
  console.log(checkauth);
  if (checkauth) {
    next();
  } else {
    res.json({
      'success': req.session.inSession,
      'text': 'please login'

    });
  }
}

function makeKey() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


function updateHistoryVote(idActivity, req) {
  UserModel.findById(idUser, function(err, doc) {
    //var id = mongoose.Types.ObjectId('593109439f23d41f68cd167b')

    var history_activity = doc.history_activity
    history_activity.push(idActivity)


    UserModel.update({
        _id: idUser
      }, {
        $set: {
          history_activity: history_activity
        }
      },
      function(err, result) {
        if (err) throw err;
        console.log(result);
      }

    );
  });

}

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'Express eiei'
  });
});

router.get('/showimg', function(req, res, next) {
  ActivityModel.find({
    name: 'test'
  }, function(err, doc) {
    res.json({
      success: true,
      activity: doc
    });
  })
});

//create activity
router.post('/add_activity', function(req, res) {
  var choices = []
  for (var i = 0; i < req.body.choice.length; i++) {
    choice = {
      choice: req.body.choice[i],
      score: 0
    }
    choices.push(choice)
  }


  var activity = {
    'name': req.body.name,
    'type': req.body.type,
    'location': req.body.location,
    'result_vote': "",
    'key': makeKey(),
    'description': req.body.description,
    'image': req.body.image,
    'exprie': req.body.exprie,
    'date': req.body.date,
    'join': 0,
    'owner': req.session.userid,
    'choice': choices
  }
  console.log(activity);
  ActivityModel.create(activity, function(err, doc) {
    if (err) {

    }
    res.json({
      'success': true,
      'activity': doc
    });
  })
});

//vote choice activity
router.post('/vote_choice_activity', checkAuth, function(req, res) {
  console.log(req.body.choice + " " + req.body.id);
  ActivityModel.findById(req.body.id, function(err, doc) {
    var choices = doc.choice
    var score = choices[req.body.choice].score
    score = score + 1
    choices[req.body.choice].score = score
    console.log(choices)

    ActivityModel.update({
        _id: req.body.id
      }, {
        $set: {
          choice: choices
        }
      },
      function(err, result) {
        if (err) {
          res.json({
            success: false
          })
        }
        updateHistoryVote(doc._id, req)
        res.json({
          success: true
        })
      })
  });
});

//join activity
router.post('/join_activity', checkAuth,
  function(req, res) {
    console.log(req.session.user);

    ActivityModel.findById(req.body.id, function(err, doc) {
      var join = doc.join
      join++;
      ActivityModel.update({
          _id: req.body.id
        }, {
          $set: {
            join: join
          }
        },
        function(err, result) {
          if (err) throw err;
          console.log(doc.name + " join " + doc.join);
          updateHistoryVote(doc._id, req)
          res.json({
            'success': true,
          });
        }
      );
    })
  });

// get result vote activity
router.post('/result_vote', function(req, res) {

  ActivityModel.findById(req.body.id, function(err, doc) {
    var choices = doc.choice
    var max = 0;
    var result
    for (var i = 0; i < choices.length; i++) {
      if (max < choices[i].score) {
        max = choices[i].score
        result = choices[i].choice
      }
    }
    res.json({
      'success': true,
      'result': result
    });
  })
});


//register
router.post('/register', function(req, res) {
  var password;
  encrypt.encryptPwd(req.body.password, function(err, hash) {
    if (err) {
      console.log(err);
    } else {
      password = hash;
      var user = {
        'name': req.body.name,
        'student_id': req.body.id,
        'password': password,
        'username': req.body.username,
        'faculty': req.body.faculty
      }
      UserModel.create(user, function(err, doc) {
        if (err) {
          res.status(500).json({
            message: err
          });
        }
        res.json({
          'success': true,
          'user': doc
        });
      })
    }
  })

});


router.get('/test_facebook', function(req, res) {
  res.send("login facebook <a href='/auth/facebook'>here</a> ");
})

//login with facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function(req, res) {

    UserModel.find({
      username: req.user.displayName
    }, function(err, docs) {

      if (docs.length == 0) {
        console.log('null user');
        var user = {
          'name': req.user.displayName,
          'student_id': 0,
          'password': 0,
          'username': req.user.displayName,
          'faculty': "null",
          'history_activity': []
        }
        UserModel.create(user, function(err, doc) {
          console.log(doc);
          res.json({
            'success': true,
            'text': 'Login success',
            'user': docs,
          });
        })

      }
      console.log(req.user.displayName + " logged in");
      req.session.user = req.user.displayName;
      req.session.inSession = true;
      res.json({
        'success': true,
        'text': 'Login success',
        'user': docs,
      });
    })

  });


//login user

router.post('/login', function(req, res) {
  UserModel.find({
    username: req.body.username
  }, function(err, docs) {
    if (docs.length === 0) {
      res.json({
        'success': false,
        'text': 'incorrect username or password',
      });
    } else if (!req.body.username || !req.body.password) {
      res.send('login failed');
    } else if (auth.checkLogin(docs[0].password, req.body.password)) {
      console.log(req.body.username + " logged in");
      //console.log(docs[0]._id);
      req.session.user = req.body.username;
      req.session.userid = docs[0]._id;
      req.session.inSession = true;
      checkauth = true
      idUser = docs[0]._id;
      username = req.body.username;

      res.json({
        'success': req.session.inSession,
        'text': 'Login success',
        'user': docs,
      });
    } else {

      res.json({
        'success': req.session.inSession,
        'text': 'incorrect username or password',
      });
    }

  })

});

router.get('/content', checkAuth, function(req, res) {
  res.send("Congrat! You are now in authorized session. You are already logged in.");
});

router.get('/check_auth', function(req, res) {

  console.log(req.session.user);
  res.json({
    'success': checkauth,
    'username': username

  });
});

router.get('/get_activities_all', function(req, res) {
  ActivityModel.find({}, function(err, doc) {
    res.json({
      'success': true,
      'activity': doc
    });
  })

});

// Logout endpoint
router.get('/logout', function(req, res) {
  req.session.destroy();
  checkauth = false
  res.send("logout success!");
});

module.exports = router;
