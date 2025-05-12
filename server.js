const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const diaryRouter = require('./routes/diary');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diary', diaryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}에서 서버 실행 중`);
});
