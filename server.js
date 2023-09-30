let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send([
        {
            'id' : 1,
            'image' : 'https://picsum.photos/64/64',
            'name' : '홍길동',
            'birthday' : '950729',
            'gender' : '남자',
            'job' : '대학생'
          },
          {
            'id' : 2,
            'image' : 'https://picsum.photos/64/64',
            'name' : '김개똥',
            'birthday' : '930602',
            'gender' : '남자',
            'job' : '백수'
          },
          {
            'id' : 3,
            'image' : 'https://picsum.photos/64/64',
            'name' : '황진이',
            'birthday' : '960208',
            'gender' : '여자',
            'job' : '직장인'
          }
    ]);
});


app.listen(port, ()=>console.log(`Listening on port ${port}`));



