var express = require('express');
var router = express.Router();
const verifyToken = require('../modulos/check-auth');
const { ensureAuthenticated } = require('../config/auth');
const { ensureApiAuthenticated } = require('../config/authApi');

var currencyExchangeController = require('../controllers/currencyExchangeController');

router.get('/GetAll', currencyExchangeController.GetAll );
router.get('/Convert', currencyExchangeController.Convert );

module.exports = router;

