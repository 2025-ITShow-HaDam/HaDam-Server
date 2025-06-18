const db = require('../db');

exports.getTodayEvents = async (req, res) => {
  try {
    // 오늘 날짜 (YYYY-MM-DD)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // write_diary 테이블의 date 컬럼을 기준으로 일기 개수 집계
    const [rows] = await db.query(`
      SELECT date, COUNT(*) AS count
      FROM write_diary
      WHERE date IS NOT NULL
      GROUP BY date
      ORDER BY date ASC
    `);

    res.status(200).json({
      date: todayStr,
      events: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
