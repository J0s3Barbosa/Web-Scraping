var express = require('express');
var router = express.Router();
const verifyToken = require('../modulos/check-auth');
const { ensureAuthenticated } = require('../config/auth');
const { ensureApiAuthenticated } = require('../config/authApi');

var todoController = require('../controllers/todoController');

router.get('/', ensureAuthenticated , todoController.index);
router.post('/clash/createmethod', verifyToken, todoController.clashroyale_createMethod_post);
router.put('/clash/:id', verifyToken,  todoController.clashroyale_update_post);
router.delete('/clash/:id', verifyToken, todoController.clashroyale_delete_post);
router.get('/clashsAllapi', verifyToken, todoController.getClashRoyaleList );

router.get('/clashs', ensureApiAuthenticated, todoController.getClashRoyaleListOwner );
router.get('/clash/:id', ensureAuthenticated, todoController.clashroyale_detail);


router.get('/clashs/:orderby', ensureAuthenticated,  todoController.clashroyale_OrderBy);

router.get('/clashroyaleapi', ensureAuthenticated , todoController.clashroyaleapi);

router.get('/clashsAll', ensureAuthenticated, todoController.getClashRoyaleList );

router.get('/ClashRoyaleClickAndGetPrint', todoController.ClashRoyaleClickAndGetPrint);

module.exports = router;

