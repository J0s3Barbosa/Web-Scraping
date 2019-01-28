var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController');


router.get('/webscraping', weatherController.webscraping);
router.get('/Itacoatiara48forecast', weatherController.Itacoatiara48forecast);
router.get('/Itacoatiaraseatemp', weatherController.Itacoatiaraseatemp);

router.get('/wspage', (req, res) => {
    res.render('pages/wspage')
})


module.exports = router;
