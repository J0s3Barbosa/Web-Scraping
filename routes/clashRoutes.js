var express = require('express');
var router = express.Router();
const verifyToken = require('../modulos/check-auth');
const ensureAuthenticated = require('../config/auth');

var clashController = require('../controllers/clashController');

/// clashroyale ROUTES ///

// GET request for list of all ClashRoyales.
router.get('/cr', ensureAuthenticated, clashController.cr);
router.get('/clashs',clashController.getClashRoyaleList );
router.get('/clash/:id', clashController.clashroyale_detail);
router.post('/clash/createmethod', verifyToken, clashController.clashroyale_createMethod_post);
router.put('/clash/:id', verifyToken,  clashController.clashroyale_update_post);
router.delete('/clash/:id', verifyToken, clashController.clashroyale_delete_post);

router.get('/clashroyaleapi', clashController.clashroyaleapi);


// GET request for creating ClashRoyale. NOTE This must come before route for id (i.e. display clash).
router.post('/clash/create', clashController.clashroyale_create_post);
router.get('/clash/create', clashController.clashroyale_create_get);
router.get('/clash/:id/delete', clashController.clashroyale_delete_get);
router.get('/clash/update/:id', clashController.clashroyale_update_get);


router.get('/ClashRoyaleClickAndGetPrint', clashController.ClashRoyaleClickAndGetPrint);

module.exports = router;

