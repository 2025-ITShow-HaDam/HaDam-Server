const db = require('../db');

exports.getTodayEvents = async (req, res) => {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const [eventCounts] = await db.query(`
      SELECT diary_date AS date, COUNT(*) AS count
      FROM write_diary
      GROUP BY diary_date
      ORDER BY diary_date ASC
    `);

    res.status(200).json({
      date: todayStr,
      events: eventCounts
    });
  } catch (err) {
    console.error("이벤트 조회 오류:", err);
    res.status(500).json({ error: err.message });
  }
};
