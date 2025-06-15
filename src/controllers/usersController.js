const db = require('../db');

exports.create = async (req, res) => {
    const {
        user_id, email, name,  password
    } = req.body;

    const profile = req.body.profile || 'https://hadam.mirim-it-show.site/assets/profil.svg';

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

