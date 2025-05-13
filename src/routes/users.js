const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.post('/', usersController.create);
router.get('/', usersController.getAll);

module.exports = router;
