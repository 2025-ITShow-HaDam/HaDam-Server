const express = require('express');
const router = express.Router();
const controller = require('../controllers/reactionsController');

router.post('/', controller.createReaction);
router.get('/:diaryId', controller.getReactions);

module.exports = router;
