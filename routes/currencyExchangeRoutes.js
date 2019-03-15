var express = require('express');
var router = express.Router();
const verifyToken = require('../modulos/check-auth');
const { ensureAuthenticated } = require('../config/auth');
const { ensureApiAuthenticated } = require('../config/authApi');

var currencyExchangeController = require('../controllers/currencyExchangeController');

router.get('/', currencyExchangeController.default );
router.get('/getAll', currencyExchangeController.getAll );
router.get('/convert', currencyExchangeController.convert );
router.post('/convertSave', currencyExchangeController.convertSave );

module.exports = router;

