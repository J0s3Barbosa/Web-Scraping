var express = require('express');
var router = express.Router();
const verifyToken = require('../modulos/check-auth');
const { ensureAuthenticated } = require('../config/auth');
const { ensureApiAuthenticated } = require('../config/authApi');

var clashController = require('../controllers/clashController');


router.post('/clash/createmethod', verifyToken, clashController.clashroyale_createMethod_post);
router.put('/clash/:id', verifyToken,  clashController.clashroyale_update_post);
router.delete('/clash/:id', verifyToken, clashController.clashroyale_delete_post);
router.get('/clashsAllapi', verifyToken, clashController.getClashRoyaleList );

router.get('/clashs', ensureApiAuthenticated, clashController.getClashRoyaleListOwner );
router.get('/clash/:id', ensureAuthenticated, clashController.clashroyale_detail);


router.get('/clashs/:orderby', ensureAuthenticated,  clashController.clashroyale_OrderBy);

router.get('/clashroyaleapi', ensureAuthenticated , clashController.clashroyaleapi);

router.get('/clashsAll', ensureAuthenticated, clashController.getClashRoyaleList );

router.get('/ClashRoyaleClickAndGetPrint', clashController.ClashRoyaleClickAndGetPrint);

module.exports = router;

