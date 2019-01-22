var express = require('express');
var router = express.Router();

var clashController = require('../controllers/clashController');

/// clashroyale ROUTES ///

// GET request for creating ClashRoyale. NOTE This must come before route for id (i.e. display clash).
router.get('/clash/create', clashController.clashroyale_create_get);

// POST request for creating ClashRoyale.
router.post('/clash/create', clashController.clashroyale_create_post);

// POST request for creating ClashRoyale fir index.
router.post('/clash/createmethod', clashController.clashroyale_createMethod_post);

// GET request to delete ClashRoyale.
router.get('/clash/:id/delete', clashController.clashroyale_delete_get);

// POST request to delete ClashRoyale.
router.post('/clash/:id/delete', clashController.clashroyale_delete_post);

// GET request to update ClashRoyale.
router.get('/clash/:id/update', clashController.clashroyale_update_get);

// POST request to update ClashRoyale.
router.post('/clash/:id/update', clashController.clashroyale_update_post);

// GET request for one ClashRoyale.
router.get('/clash/:id', clashController.clashroyale_detail);

// GET request for list of all ClashRoyales.
router.get('/clashs', clashController.getClashRoyaleList);
 
module.exports = router;
