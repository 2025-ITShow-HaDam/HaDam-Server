const express = require('express');
const router = express.Router();
const controller = require('../controllers/reactionsController');

router.post('/', controller.createReaction);
router.get('/:diaryId', controller.getReactions);

router.get('/users/:diaryId', controller.getReactionsWithUsers);

module.exports = router;
