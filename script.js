const express = require('express');
const mysql=require('mysql');
const path = require('path');
const app = express();
app.use(express.urlencoded());
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345678',
    database:'sample'
});
connection.connect();
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'form.html'));
});
app.post('/signup',(req,res) => {
    connection.query("insert into form(regnum, fullname, pass, mob) values (?, ?, ?, ?)",
        [req.body.regnum, req.body.fullname, req.body.pass, req.body.mob],
        (err,result) => {
            res.send('User saved!');
        }
    );
});
app.post('/login', (req, res) => {
    const regnum=req.body.regnum;
    const pass=req.body.pass;
    connection.query(
        'select * from form where regnum = ? and pass = ?',
        [regnum, pass],
        (err, results) => {
            if (err) {
                console.log("error");
            }


            if (results.length > 0) {
                res.send('Welcome '+regnum+' You are logged in.');
            } else {
                res.send('Invalid username or email');
            }
        }
    );
});
app.listen(3000);