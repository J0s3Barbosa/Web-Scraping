const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ensureAuthenticated } = require('../config/auth');

const User = require("../models/user");
const config = require("../config/config");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            // process.env.JWT_KEY,
            config.JWT_KEY,
            {
              expiresIn: config.JWT_TIME_EXPIRES
            }
          );
          console.log(token)
          console.log(user[0].email)
          req.flash('user', user[0].email);
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/:email", (req, res, next) => {
  console.log(req.params.email)
  User.find({ email: req.params.email })
     .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            // process.env.JWT_KEY,
            config.JWT_KEY,
            {
              expiresIn: config.JWT_TIME_EXPIRES
            }
          );
          console.log(token)
          console.log(user[0].email)
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/listAllUsers',  ensureAuthenticated, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });

});


router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Systems login register
router.post("/register", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        req.flash('error_msg', 'Mail exists');
        return res.status(409).redirect('/signup');
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                console.log('redirecting');
                req.flash('success_msg', 'Signed successfully!');
                res.status(201).redirect('/');
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/systemlogin", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        req.flash('error_msg', 'Auth failed');
        return res.status(401).redirect('/login');
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          req.flash('error_msg', 'Auth failed');
          return res.status(401).redirect('/login');
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            // process.env.JWT_KEY,
            config.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          req.flash('success_msg', 'Auth successful! token= ' + token);
          req.flash('usertoken', 'Bearer ' + token);
          req.flash('user', user[0].email);

          return res.redirect('/');
        }
        req.flash('error_msg', "Auth failed");
        res.status(401).redirect('/login');

      });
    })
    .catch(err => {
      console.log(err);
      req.flash('error_msg', err);
      res.status(500).redirect('/login');

    });
});

// Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/login');
// });

router.get('/logout', (req, res) => {
  req.flash('user', '');
  res.redirect('/');
});


module.exports = router;
