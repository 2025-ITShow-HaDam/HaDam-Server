const db = require('../db');

exports.create = async (req, res) => {
    const {
        user_id, email, name,  password
    } = req.body;

    const profile = req.body.profile || 'http://hadam.mirim-it-show.site:3000/assets/profile.svg';

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

exports.get = async (req, res) => {
    try {
        const user = await db.query('SELECT * FROM users WHERE user_id = ?', [req.params.user_id]);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.update = async (req, res) => {
    const { user_id } = req.params;
    const { profile } = req.body;

    try {
        await db.query(
            'UPDATE users SET profile = ? WHERE user_id = ?',
            [profile, user_id]
        );
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
