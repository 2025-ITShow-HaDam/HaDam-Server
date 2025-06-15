const db = require('../db');

exports.createReaction = async (req, res) => {
  const { diary_id, reaction_type, user_id } = req.body;

  if (!diary_id || !reaction_type || !user_id) {
    return res.status(400).json({ error: '필수 데이터 누락' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO reactions (diary_id, reaction_type, user_id) VALUES (?, ?, ?)`,
      [diary_id, reaction_type, user_id]
    );
    res.status(201).json({ message: '반응 등록 완료', reactionId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReactions = async (req, res) => {
  const diaryId = req.params.diaryId;

  try {
    const [rows] = await db.execute(
      `SELECT reaction_type, COUNT(*) AS count FROM reactions WHERE diary_id = ? GROUP BY reaction_type`,
      [diaryId]
    );
    res.status(200).json({ reactions: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
