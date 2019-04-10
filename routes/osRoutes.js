var express = require('express');
var router = express.Router();

var osController = require('../controllers/osController');

router.post('/os/createmethod', osController.os_post);
router.put('/os/:id',  osController.os_update);
router.delete('/os/:id', osController.os_delete);
router.get('/os/all', osController.getAll );
router.get('/os', osController.default );

module.exports = router;

