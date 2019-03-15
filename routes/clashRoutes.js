var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var clashController = require('../controllers/clashController');

router.get('/cr', ensureAuthenticated , clashController.cr);

module.exports = router;

