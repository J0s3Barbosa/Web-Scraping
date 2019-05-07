var express = require('express');
var router = express.Router();

var osController = require('../controllers/osController');

router.post('/os/new', osController.os_post);
router.put('/os/:id',  osController.os_update);
router.put('/os/start/:id',  osController.os_update_dt_inicio);
router.put('/os/finish/:id',  osController.os_update_dt_fim);
router.delete('/os/:id', osController.os_delete);
router.get('/os/findbyid/:id', osController.get_one);
router.get('/os/all', osController.getAll );
router.get('/os', osController.default );
router.get('/os/search', osController.search );
router.get('/os/searchStatus', osController.getOsByStatus );

router.get('/os/:orderby',  osController.os_orderBy);

module.exports = router;

