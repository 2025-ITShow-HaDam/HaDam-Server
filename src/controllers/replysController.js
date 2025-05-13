const db = require('../db');

exports.create = async (req, res) => {
    const {
        reply, created_at
    } = req.body;
    try {
        await db.query(
            'INSERT INTO replys (reply, created_at) VALUES (?, ?)',
            [reply, created_at]
        );
        res.status(201).json({
            message: 'Reply added'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM replys');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
