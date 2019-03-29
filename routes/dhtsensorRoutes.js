var express = require('express');
var router = express.Router();

var DhtSensorController = require('../controllers/DhtSensorController');

router.get('/', DhtSensorController.default );
router.get('/getAllData', DhtSensorController.getAllData );
router.get('/SaveData', DhtSensorController.SaveData );

module.exports = router;

