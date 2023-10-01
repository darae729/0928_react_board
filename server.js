const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 7777;

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/customers', (req, res) => {
    connection.query("SELECT * FROM CUSTOMER",
    function(err,rows,fields){
        if(err){
            console.log("데이터 불러오기 실패");
            // console.log(err);
        }else{
            console.log("데이터 불러오기 성공");
            // console.log(rows);
            res.status(200).json(rows);
        }
  });
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    console.log(name);
    console.log(birthday);

    // 데이터베이스 연결 및 쿼리 실행
    db.query(sql, [name, birthday, gender, job, image], (error, result) => {
        if (error) {
            console.error('INSERT error:', error);
            return res.status(500).send('Error inserting data into the database');
        }
        console.log('INSERT successful');
        // 성공적으로 삽입된 경우 응답을 보내거나 다른 작업을 수행할 수 있습니다.
        res.status(200).send('Data inserted successfully');
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));



