var express = require('express');
var router = express.Router();
const verifyToken = require('../modulos/check-auth');
const { ensureAuthenticated } = require('../config/auth');
const { ensureApiAuthenticated } = require('../config/authApi');

var todoController = require('../controllers/todoController');

router.get('/', ensureAuthenticated , todoController.index);
router.get('/all', ensureAuthenticated , todoController.all);
router.put('/update/:id', verifyToken,  todoController.update);
router.delete('/delete/:id', verifyToken, todoController.delete);
router.post('/post', verifyToken, todoController.post);
router.get('/detail/:id', ensureAuthenticated, todoController.detail);
router.get('/OrderBy/:orderby', ensureAuthenticated,  todoController.OrderBy);

module.exports = router;

