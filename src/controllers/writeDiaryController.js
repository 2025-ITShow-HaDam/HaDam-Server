const db = require('../db');

exports.create = async (req, res) => {
  const {
    title, diary, open, diary_date, diary_type, user_id
  } = req.body;
  try {
    await db.query(
      'INSERT INTO write_diary (title, diary, open, diary_date, diary_type, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, diary, open, diary_date, diary_type, user_id]
    );
    res.status(201).json({ message: 'diary entry created' });
  } catch (error) {
    console.error("DB 오류:", error);
    res.status(500).json({ error: error.message });
  }
};
  
exports.getAll = async (req, res) => {
  try {
      const [rows] = await db.query('SELECT * FROM write_diary');
      res.status(200).json(rows);
  } catch (error) {
      res.status(500).json({
          error: error.message
      });
  }
};

exports.get = async (req, res) => {
  try {
    const [diary] = await db.query('SELECT * FROM write_diary WHERE id = ?', [req.params.id]);
    if (diary.length === 0) {
      return res.status(404).json({ message: "일기를 찾을 수 없습니다." });
    }
    res.status(200).json(diary[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query("DELETE FROM write_diary WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "삭제 성공" });
  } catch (error) {
    console.error("삭제 오류:", error);
    res.status(500).json({ error: "삭제 실패" });
  }
};