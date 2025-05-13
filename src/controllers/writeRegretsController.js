const db = require('../db');

exports.create = async (req, res) => {
    const { title_r, diary_r, open_r, date_r } = req.body;
    try {
        await db.query(
            'INSERT INTO write_regrets (title_r, diary_r, open_r, date_r) VALUES (?, ?, ?, ?)',
            [title_r, diary_r, open_r, date_r]
        );
        res.status(201).json({
            message: 'Regret entry created'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM write_regrets');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
