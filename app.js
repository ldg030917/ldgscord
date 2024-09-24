const express = require('express')
var session = require('express-session')
const bcrypt = require('bcrypt')
const cors = require('cors')
const db = require('./lib/db')
const templates = require('./templates/template')
const bodyParser = require('body-parser')
const userRouter = require('./userRouter')

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
        <p>메인화면입니다.</p>
        <a href="/user">
        <button class="btn">사용자</button>
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

app.use('/user', userRouter);

app.listen(port, () => {
    console.log("start server at port 8000")
})

app.listen(3000)