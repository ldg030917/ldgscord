const express = require('express')
var session = require('express-session')
//const bcrypt = require('bcrypt')
const cors = require('cors')
const db = require('./lib/db')
const templates = require('./templates/template')
const bodyParser = require('body-parser')

const app = express()
port = 8000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('templates'));

app.use(session({
    secret: 'my-secret-key',  // 세션 암호화를 위한 비밀 키
    resave: false,            // 세션이 수정되지 않아도 다시 저장할지 여부
    saveUninitialized: true,  // 초기화되지 않은 세션도 저장할지 여부
    cookie: { 
        maxAge: 60000         // 쿠키의 수명 (밀리초 단위)
    }
}));

app.get('/', function (req, res) {
    var html = templates.HTML('Main',
        `<h1>환영합니다!</h1>
        <p>로그인하거나 회원가입을 진행하세요.</p>
        <a href="/login">
        <button class="btn">로그인</button>
        </a>
        <a href="/register">
        <button class="btn">회원가입</button>
        </a>`
    )
    if (req.session.is_logined) {   //로그인 된 상태일 시
        var id = req.session.nickname
        res.redirect(`/user/${id}`)
    }
    else {
        res.send(html);
    }
})

app.get('/user/:id', (req, res) => {
    res.send(`환영합니다! ${req.params.id}님`)
})

app.get('/login', (req, res) => {       //로그인 화면
    var html = templates.HTML('login',
        `<h1>로그인</h1>
        <div class="login-form">
        <form action="/login_process" method="post">
        <input type="text" name="uid" placeholder="아이디" required>
        <input type="password" name="pw" placeholder="비밀번호" required>
        <input class="btn" type="submit" value="로그인">
        </form>
        </div>`
    )
    res.send(html)
})

app.post('/login_process', (req, res) => {       //로그인
    console.log(req.body)
    var username = req.body.uid
    var password = req.body.pw
    if (username && password){
        db.query('SELECT * FROM userTable WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            // DB에 같은 회원이 있는지 확인
            if (error) throw error;
            console.log(results)
            if (results.length > 0){
                req.session.is_logined = true;      // 세션 정보 갱신
                req.session.nickname = username;
                req.session.save(function () {
                    res.redirect('/');
                });
            }
            else {
                res.send(`<script type="text/javascript">alert("로그인이 실패하였습니다!");
                document.location.href="/login";</script>`);
            }
        })
    }
    else {
        res.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/login";</script>`);
    }
})

app.get('/register', (req, res) => {       //회원가입 화면
    var html = templates.HTML('register',
        `<h1>회원가입</h1>
        <div class="login-form">
        <form action="/register_process" method="post">
        <input type="text" name="uid" placeholder="아이디" required>
        <input type="password" name="pw" placeholder="비밀번호" required>
        <input type="password" name="pw2" placeholder="비밀번호 확인" required>
        <input class="btn" type="submit" value="회원가입">
        </form>
        </div>`
    )
    res.send(html)
})


app.post('/register_process', (req, res) => {       //회원가입
    var username = req.body.uid;
    var password = req.body.pw;
    var password2 = req.body.pw2;

    if (username && password && password2) {
        db.query(' SELECT * FROM userTable WHERE username = ?', [username], function(error, results, fields) {
            // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
                db.query('INSERT INTO usertable (username, password) VALUES(?,?)', [username, password], function (error, data) {
                    if (error) throw error2;
                    res.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                    document.location.href="/";</script>`);
                });
            }
            else if (password != password2) {   //비밀번호 일치 X
                res.send(`<script type="text/javascript">alert("비밀번호가 일치하지 않습니다."); 
                document.location.href="/register";</script>`);
            }
            else {  //같은 아이디 존재
                res.send(`<script type="text/javascript">alert("같은 아이디의 회원이 존재합니다."); 
                document.location.href="/register";</script>`);
            }

        })
    }
    else {      
        res.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/register";</script>`);
    }
})

app.listen(port, () => {
    console.log("start server at port 8000")
})

app.listen(3000)