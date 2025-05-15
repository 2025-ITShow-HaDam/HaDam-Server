const db = require('../db');

exports.create = async (req, res) => {
    const {
        user_id, email, name, profile, password
    } = req.body;
    try {
        await db.query(
            'INSERT INTO users (user_id, email, name, profile, password) VALUES (?, ?, ?, ?, ?)',
            [user_id, email, name, profile, password]
        );
        res.status(201).json({
            message: 'User created'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

