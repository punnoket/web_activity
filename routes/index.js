var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var auth = require('./authentication');
var encrypt = require('./encryptModule');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'Express eiei'
  });
});


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

//login with facebook
router.get('/test_facebook', function(req, res) {
  res.send("login facebook <a href='/auth/facebook'>here</a> ");
})

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    console.log(req.user.displayName + " logged in");
    req.session.user = req.user.displayName;
    req.session.inSession = true;
    res.send("Hi " + req.session.user);
  });


//login user

router.post('/login', function(req, res) {
  UserModel.find({
    username: req.body.username
  }, function(err, docs) {
    if (docs.length === 0) {
      res.send('incorrect username or password');
    } else if (!req.body.username || !req.body.password) {
      res.send('login failed');
    } else if (auth.checkLogin(docs[0].password, req.body.password)) {
      console.log(req.body.username + " logged in");

      req.session.user = req.body.username;
      req.session.inSession = true;

      res.send("login success! Click <a href='/content'>here</a> to see the authorized content.");
    } else {
      res.send('incorrect username or password');
    }

  })

});

function checkAuth(req, res, next) {

  if (req.session.inSession && req.session.user) {
    next();
  } else {
    res.send('You are not authorized to view this page. Please <a href="/login">logon</a>');
  }
}

router.get('/content', checkAuth, function(req, res) {
  res.send("Congrat! You are now in authorized session. You are already logged in.");
});



// Logout endpoint
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.send("logout success!");
});


module.exports = router;
