var express = require('express');
var router = express.Router();

var osController = require('../controllers/osController');

router.get('/osInterface', osController.osInterface);

module.exports = router;

