const express = require('express')
//const bcrypt = require('bcrypt')
const db = require('./lib/db')
const bodyParser = require('body-parser')

const app = express()
port = 8000

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('templates'));

app.get('/', function (req, res) {
    res.redirect('register.html')      //페이지 이동
    res.send('Hello World')
})

app.get('/users/:id', (req, res) => {
    const q = req.params
    console.log(q)

    res.send({'user': q.id })
})

app.post('/login', (req, res) => {       //로그인
    var userid = req.body.uid
    var password = req.body.pw
    if (userid && password){
        console.log(userid, password)
        res.send("wait a moment")
    }
})

app.post('/signup_process', (req, res) => {       //회원가입
    var username = req.body.uid;
    var password = req.body.pw;

    res.send("wait a moment")
    if (username && password) {
        db.query(' SELECT * FROM usertable WHERE username = ?', [username], function(error, results, fields) {
            // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
                db.query('INSERT INTO usertable (username, password) VALUES(?,?)', [username, password], function (error, data) {
                    if (error) throw error2;
                    res.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                    document.location.href="/";</script>`);
                });
            }

        })
    }
    else {
        response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/auth/register";</script>`);
    }
})

app.listen(port, () => {
    console.log("start server at port 8000")
})

app.listen(3000)