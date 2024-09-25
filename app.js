const express = require('express')
var session = require('express-session')
const cors = require('cors')
const db = require('./lib/db')
const http = require('http')
const socketIo = require('socket.io');
const templates = require('./templates/template')
const bodyParser = require('body-parser')
const userRouter = require('./userRouter')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

const sessionMiddleware = session({
    secret: 'my-secret-key',  // 세션 암호화를 위한 비밀 키
    resave: false,            // 세션이 수정되지 않아도 다시 저장할지 여부
    saveUninitialized: true,  // 초기화되지 않은 세션도 저장할지 여부
    cookie: { 
        maxAge: 60000         // 쿠키의 수명 (밀리초 단위)
    }
})

app.use(sessionMiddleware);

io.use((socket, next) => {      //소켓과 세션 연동
    sessionMiddleware(socket.request, {}, next)
})


app.use(express.static('templates'));
app.use(express.static('public'))

app.get('/', function (req, res) {
    var html = templates.HTML('Main',
        `<h1>환영합니다!</h1>
        <p>메인화면입니다.</p>
        <a href="/user">
        <button class="btn">사용자</button>
        </a>
        <a href="/chat">
        <button class="btn">채팅</button>
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

app.use(express.static(path.join(__dirname, 'templates')));

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'chat.html'));
})

io.on('connection', function(socket) { //왜 안되는거야?
    const session = socket.request.session;     //현재 소켓의 세션 정보 가져오기
    console.log("user:", session.nickname)   //세션 로그인한 유저 아이디 출력
    console.log("접속됨");

    socket.on('send', function(data) {
        if (!session.nickname) session.nickname = 'anonymous'
        console.log('전달된 메시지:', data)
        console.log('사용자:', session.nickname)
        io.emit('update', {
            uid: session.nickname,
            msg: data
        })
        //보낸 메시지 브로드캐스트
    })
    
    socket.on('disconnect', function() {
        console.log("접속종료")
    })
})

server.listen(3000,  () => {
    console.log("start server at port 3000")
})