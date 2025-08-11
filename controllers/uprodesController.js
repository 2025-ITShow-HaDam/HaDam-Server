const db = require('../db');

exports.create = async (req, res) => {
    const {
        id, user_id, uploaded_at
    } = req.body;
    try {
        await db.query(
            'INSERT INTO uprodes (id, user_id, uploaded_at) VALUES (?, ?, ?)',
            [id, user_id, uploaded_at]
        );
        res.status(201).json({
            message: 'Upload logged'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM uprodes');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
