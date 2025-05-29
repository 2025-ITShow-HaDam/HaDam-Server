const db = require('../db');

exports.create = async (req, res) => {
    const {
        title, diary, open, date, diary_type
    } = req.body;
    try {
        await db.query(
            'INSERT INTO write_diary (title, diary, open, date, diary_type) VALUES (?, ?, ?, ?, ?)',
            [title, diary, open, date, diary_type]
        );
        res.status(201).json({
            message: 'diary entry created'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
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
