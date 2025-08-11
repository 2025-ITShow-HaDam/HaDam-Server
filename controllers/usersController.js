const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.create = async (req, res) => {
    const { user_id, email, name, password } = req.body;
    const profile = req.body.profile || 'assets/profile.svg';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (user_id, email, name, profile, password) VALUES (?, ?, ?, ?, ?)',
            [user_id, email, name, profile, hashedPassword]
        );

        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요.' });
        }

        const [users] = await db.query('SELECT * FROM users WHERE user_id = ?', [user_id]);

        if (users.length === 0) {
            return res.status(401).json({ error: '존재하지 않는 사용자입니다' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: '비밀번호가 일치하지 않습니다' });
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_KEY,
            { expiresIn: '365d' }
        );

        return res.status(200).json({
            token,
            user_id: user.user_id,
            email: user.email,
            name: user.name,
            profile: user.profile
        });

    } catch (err) {
        console.error('로그인 오류:', err);
        return res.status(500).json({ error: '서버 오류' });
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
