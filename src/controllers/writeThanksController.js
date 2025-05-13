const db = require('../db');

exports.create = async (req, res) => {
    const {
        title_t, diary_t, open_t, date_t
    } = req.body;
    try {
        await db.query(
            'INSERT INTO write_thanks (title_t, diary_t, open_t, date_t) VALUES (?, ?, ?, ?)',
            [title_t, diary_t, open_t, date_t]
        );
        res.status(201).json({
            message: 'Thanks entry created'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM write_thanks');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
