const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/write-thanks', require('./routes/writeThanks'));
app.use('/write-regrets', require('./routes/writeRegrets'));
app.use('/write-post', require('./routes/writePost'));
app.use('/replys', require('./routes/replys'));
app.use('/uprodes', require('./routes/uprodes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} 에서 서버 실행 중`);
});

app.get("/", (req, res) => {
    res.send('Hello Node.js');
})