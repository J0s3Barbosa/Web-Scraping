var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController');

router.get('/webscraping', weatherController.webscraping);
router.get('/Itacoatiara48forecast', weatherController.Itacoatiara48forecast);
router.get('/Itacoatiaraseatemp', weatherController.Itacoatiaraseatemp);

module.exports = router;
