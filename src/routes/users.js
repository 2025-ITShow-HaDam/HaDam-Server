const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const controller = require('../controllers/usersController');


router.post('/', controller.create);
router.get('/', controller.getAll);
router.patch('/:user_id', controller.update);

router.post('/login', async (req, res) => {
    try {
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요.' });
        }

        const [users] = await db.query('SELECT * FROM users WHERE user_id = ?', [user_id]);

        if (users.length === 0) {
            return res.status(401).json({ error: '존재하지 않는 사용자입니다.' });
        }

        const user = users[0];

        if (password !== user.password) {
            return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
        }

        const token = jwt.sign(
            { user_id: user.user_id },
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
});


module.exports = router;
