const express = require('express');
const router = express.Router();
const eventLogController = require('../controllers/eventLogController');

router.post('/', eventLogController.getTodayEvents); // 저장용 POST


module.exports = router;