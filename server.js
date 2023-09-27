let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/hello',(req,res)=>{
    res.send({message: 'hellow Express!'});
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));



