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
  // 1) URL 파라미터에서 id 가져오기
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "유효하지 않은 ID입니다." });
  }

  try {
    // 2) 연관된 reactions 먼저 삭제
    await db.query("DELETE FROM reactions WHERE diary_id = ?", [id]);

    // 3) write_diary에서 실제 일기 삭제
    const [result] = await db.query(
      "DELETE FROM write_diary WHERE id = ?",
      [id]
    );

    // 4) 없는 ID를 삭제하려 할 때 404 처리
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "해당 일기를 찾을 수 없습니다." });
    }

    // 5) 성공 응답
    return res.status(200).json({ message: "삭제 성공" });
  } catch (err) {
    console.error("삭제 오류 상세:", err);
    return res.status(500).json({ error: err.message });
  }
};