const db = require('../db');

exports.login = async (req, res) => {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
        return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요.' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE user_id = ? AND password = ?',
            [user_id, password]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = rows[0];

        res.status(200).json({
            message: '로그인 성공',
            user: {
                user_id: user.user_id,
                email: user.email,
                name: user.name,
                profile: user.profile,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
