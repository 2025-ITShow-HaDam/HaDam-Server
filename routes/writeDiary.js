const express = require('express');
const router = express.Router();
const controller = require('../controllers/writeDiaryController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, controller.create);
router.get('/', verifyToken, controller.getAll);
router.get('/user/:userId', verifyToken, controller.get);
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
