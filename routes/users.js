const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const controller = require('../controllers/usersController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:user_id', controller.get);
router.patch('/:user_id', controller.update);
router.post('/login', controller.login);



module.exports = router;
