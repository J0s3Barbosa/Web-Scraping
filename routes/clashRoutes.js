var express = require('express');
var router = express.Router();
const verifyToken = require('../modulos/check-auth');

var clashController = require('../controllers/clashController');

router.get('/cr', clashController.cr);
router.get('/clashs',clashController.getClashRoyaleList );
router.get('/clash/:id', clashController.clashroyale_detail);
router.post('/clash/createmethod', verifyToken, clashController.clashroyale_createMethod_post);
router.put('/clash/:id', verifyToken,  clashController.clashroyale_update_post);
router.delete('/clash/:id', verifyToken, clashController.clashroyale_delete_post);

router.get('/clashroyaleapi', clashController.clashroyaleapi);

router.get('/ClashRoyaleClickAndGetPrint', clashController.ClashRoyaleClickAndGetPrint);

module.exports = router;

