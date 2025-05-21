const express = require('express');
const router = express.Router();
const eventLogController = require('../controllers/eventLogController');

router.post('/', eventLogController.logEvent);

module.exports = router;
