const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: '이메일과 비밀번호를 입력해주세요.' });
        }

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: '존재하지 않는 사용자' });
        }

        const user = users[0];

        // bcrypt 비교 대신 평문 비교
        if (password !== user.password) {
            return res.status(401).json({ error: '비밀번호가 일치하지 않습니다' });
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
            },
            process.env.JWT_KEY,
            { expiresIn: '365d' }
        );

        return res.status(200).json({ token });

    } catch (err) {
        console.error('로그인 오류:', err);
        return res.status(500).json({ error: '서버 오류' });
    }
});

module.exports = router;
