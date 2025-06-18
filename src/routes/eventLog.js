const express = require('express');
const router = express.Router();
const eventLogController = require('../controllers/eventLogController');

router.post('/', eventLogController.logEvent);
router.get('/event', eventLogController.getTodayEvents);


module.exports = router;
