var express = require('express');
var router = express.Router();
var dividaAtivaController = require('../controllers/dividaAtivaController');

router.get('/DaApiSearch', dividaAtivaController.DaApiSearch);
router.get('/daobterdados', dividaAtivaController.ObterDados);

module.exports = router;
