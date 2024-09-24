const express = require('express');
const router = express.Router();
const session = require('express-session');
var db = require('./lib/db');
var templates = require('./templates/template');


router.get('/', function (req, res) {
    var html = templates.HTML('Main',
        `<h1>환영합니다!</h1>
        <p>로그인하세요!</p>
        <a href="/user/login">
        <button class="btn">로그인</button>
        </a>
        <a href="/user/register">
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

router.get('/login', (req, res) => {       //로그인 화면
    var html = templates.HTML('login',
        `<h1>로그인</h1>
        <div class="login-form">
        <form action="/user/login_process" method="post">
        <input type="text" name="uid" placeholder="아이디" required>
        <input type="password" name="pw" placeholder="비밀번호" required>
        <input class="btn" type="submit" value="로그인">
        </form>
        </div>`
    )
    res.send(html)
})

router.post('/login_process', (req, res) => {       //로그인
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
                document.location.href="/user/login";</script>`);
            }
        })
    }
    else {
        res.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/user/login";</script>`);
    }
})

router.get('/logout', (req, res) => {      //로그아웃
    console.log("YES LOGOUT")
    req.session.destroy(function (err) {
        res.redirect('/');
    })
})

router.get('/register', (req, res) => {       //회원가입 화면
    var html = templates.HTML('register',
        `<h1>회원가입</h1>
        <div class="login-form">
        <form action="/user/register_process" method="post">
        <input type="text" name="uid" placeholder="아이디" required>
        <input type="password" name="pw" placeholder="비밀번호" required>
        <input type="password" name="pw2" placeholder="비밀번호 확인" required>
        <input class="btn" type="submit" value="회원가입">
        </form>
        </div>`
    )
    res.send(html)
})


router.post('/register_process', (req, res) => {       //회원가입
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
                    document.location.href="/user";</script>`);
                });
            }
            else if (password != password2) {   //비밀번호 일치 X
                res.send(`<script type="text/javascript">alert("비밀번호가 일치하지 않습니다."); 
                document.location.href="/user/register";</script>`);
            }
            else {  //같은 아이디 존재
                res.send(`<script type="text/javascript">alert("같은 아이디의 회원이 존재합니다."); 
                document.location.href="/user/register";</script>`);
            }

        })
    }
    else {      
        res.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/user/register";</script>`);
    }
})


router.get('/:id', (req, res) => {
    var html = templates.HTML('Main', 
        `<h1>환영합니다! ${req.params.id}님</h1>
        <p>로그아웃하시겠습니까?</p>
        <a href="/user/logout">
        <button class="btn">로그아웃</button>
        </a>`
    )
    res.send(html);
})

module.exports = router