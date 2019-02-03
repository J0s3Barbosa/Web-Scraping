var express = require('express');
var router = express.Router();
var youtubeController = require('../controllers/youtubeController');
var ws = require('../modulos/ws');
var request = require('request');
var cheerio = require('cheerio');
var sendEmail = require('../modulos/sendEmail');
 
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

  
router.get('/sendEmail', sendEmail.SendEmailDefault);
router.get('/youtubeClickAndGetPrint', youtubeController.youtubeClickAndGetPrint);
router.get('/ws', ws);
router.get('/webScrapingTest', (req, res) => {
    getData()
        .then(function (body) {
            console.log('Got the following body:', body)
            res.send(body)
        })

})
function getData() {
    return new Promise(function (resolve, reject) {
        request('https://news.ycombinator.com', function (err, response, body) {
            if (err) reject(err);
            if (response.statusCode !== 200) {
                reject('Invalid status code: ' + response.statusCode);
            }
            let $ = cheerio.load(body);
            let channelList = $('span.comhead');

            let channels = [];

            for (let i = 0; i < channelList.length; i++) {
                let t = channelList.get(i);
                let channel = $(t).text();
                let artistNode = $(t).next();
                let artist = $(artistNode).text();
                let title = $(artistNode).next().text();
                //console.log(channel +'-'+ artist +'-'+ title);
                channels.push({ channel: channel, artist: artist, title: title });
            }

            resolve(channels);

        });
    });
}



// Login Page
router.get('/login', (req, res) => res.render('pages/login'));

// Register Page
router.get('/register', (req, res) => res.render('pages/register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('pages/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('pages/register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});



module.exports = router;
