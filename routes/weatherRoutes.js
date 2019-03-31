var express = require('express');
var router = express.Router();
var sendEmail = require('../modulos/sendEmail');

router.get('/wspage', (req, res, next) => {
    console.log('Request Type:', req.method)
      sendEmail.SendEmailAccess()
      next()
}, function (req, res) {
    res.render('pages/wspage', {
      user: req.user
    })
  })

module.exports = router;
