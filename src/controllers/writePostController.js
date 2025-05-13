const db = require('../db');

exports.create = async (req, res) => {
    const {
        title, diary, date
    } = req.body;
    try {
        await db.query(
            'INSERT INTO write_post (title, diary, date) VALUES (?, ?, ?)',
            [title, diary, date]
        );
        res.status(201).json({ message: 'Post created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM write_post');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
