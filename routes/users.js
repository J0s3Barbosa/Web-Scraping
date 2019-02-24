const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user');
const { ensureAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', (req, res) => res.render('pages/login', {
  user : req.user
}));

// Register Page
router.get('/register', (req, res) => res.render('pages/register', {
  user : req.user
}));

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
                res.redirect('users/login');
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
    successRedirect: '/users/dashboard',
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

router.get('/ManageUsers',  ensureAuthenticated, (req, res) => res.render('pages/ManageUsers', {
  user: req.user
})
);

router.get('/listAllUsers',  ensureAuthenticated, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });

});

router.delete('/:id', ensureAuthenticated,  (req, res) => {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) res.send(err);
    req.flash('success_msg', 'Data Deleted!');
    res.json(user);
  });

});

router.put('/:id', ensureAuthenticated, (req, res) => {

  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
    if (err) res.send(err);

    req.flash('success_msg', 'Data Updated!');
    res.json(user);
  });


});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('pages/dashboard', {
    user: req.user
  })
);



module.exports = router;
