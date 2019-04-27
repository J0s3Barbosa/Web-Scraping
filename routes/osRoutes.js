var express = require('express');
var router = express.Router();

var osController = require('../controllers/osController');

router.post('/os/new', osController.os_post);
router.put('/os/:id',  osController.os_update);
router.delete('/os/:id', osController.os_delete);
router.get('/os/all', osController.getAll );
router.get('/os', osController.default );
router.get('/os/search', osController.getOsById );
router.get('/os/searchStatus', osController.getOsByStatus );

module.exports = router;

