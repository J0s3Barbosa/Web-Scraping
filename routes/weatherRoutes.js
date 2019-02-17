var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController');
var sendEmail = require('../modulos/sendEmail');


router.get('/webscraping', weatherController.webscraping);
router.get('/Itacoatiara48forecast', weatherController.Itacoatiara48forecast);
router.get('/Itacoatiaraseatemp', weatherController.Itacoatiaraseatemp);

router.get('/wspage', (req, res, next) => {
    console.log('Request Type:', req.method)
      sendEmail.SendEmailAccess()
      next()
}, function (req, res) {
    res.render('pages/wspage')
  })

  

module.exports = router;
