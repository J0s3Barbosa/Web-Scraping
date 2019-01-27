var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController');

router.get('/webscraping', weatherController.webscraping);
router.get('/weatherWebScraping', weatherController.weatherWebScraping);

module.exports = router;
