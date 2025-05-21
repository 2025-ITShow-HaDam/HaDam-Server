const db = require('../db');

exports.logEvent = async (req, res) => {
  const { timestamp } = req.body;

  try {
    await db.query('INSERT INTO event_logs (timestamp) VALUES (?)', [timestamp]);
    res.status(200).json({ message: '이벤트 저장 완료' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
