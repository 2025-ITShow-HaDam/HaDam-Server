const db = require('../db');

exports.getTodayEvents = async (req, res) => {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const [rows] = await db.query(`
      SELECT * FROM event_logs 
      WHERE DATE(timestamp) = ?
    `, [todayStr]);

    res.status(200).json({
      date: todayStr,
      events: rows || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
