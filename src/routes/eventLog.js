const express = require('express');
const router = express.Router();
const eventLogController = require('../controllers/eventLogController');

router.get('/event', eventLogController.getTodayEvents);

exports.create = async (req, res) => {
    const {
      title, diary, open, diary_date, diary_type, user_id
    } = req.body;
  
    try {
      await db.query(
        'INSERT INTO write_diary (title, diary, open, diary_date, diary_type, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [title, diary, open, diary_date, diary_type, user_id]
      );
      const [countResult] = await db.query(
        'SELECT COUNT(*) as count FROM write_diary WHERE diary_date = ?',
        [diary_date]
      );
      const count = countResult[0].count;
  
      const [existing] = await db.query(
        'SELECT * FROM event_logs WHERE date = ?',
        [diary_date]
      );
  
      if (existing.length === 0) {
        // 없으면 새로 추가
        await db.query(
          'INSERT INTO event_logs (date, count) VALUES (?, ?)',
          [diary_date, count]
        );
      } else {
        await db.query(
          'UPDATE event_logs SET count = ? WHERE date = ?',
          [count, diary_date]
        );
      }
  
      res.status(201).json({ message: 'diary entry created with event log' });
    } catch (error) {
      console.error("DB 오류:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = router;
