let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let data = fs.readFileSync('./database.json');
let conf = JSON.parse(data);
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/api/customers',(req,res)=>{
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) =>{
            res.send(rows);
        }
    );
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));



