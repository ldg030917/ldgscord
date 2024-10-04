const express = require('express')
const expressLayouts = require('express-ejs-layouts');
var session = require('express-session')
const http = require('http')
const socketIo = require('socket.io');
const bodyParser = require('body-parser')
const path = require('path')
const userRouter = require('./routers/newuserRouter')
const serverRouter = require('./routers/serverRouter')

var db = require('./config/db');

//server, io, app 설정
const app = express()
const server = http.createServer(app)
const io = socketIo(server)


port = 3000

app.set('view engine', 'ejs');      //ejs를 뷰 엔진으로 설정
app.set('views', path.join(__dirname, '/views'));     //뷰 파일 위치 설정

app.use(express.static('public'));      //정적 파일 제공

// EJS 레이아웃 미들웨어 설정
app.use(expressLayouts);


app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));

const sessionMiddleware = session({
    secret: 'my-secret-key',  // 세션 암호화를 위한 비밀 키
    resave: false,            // 세션이 수정되지 않아도 다시 저장할지 여부
    saveUninitialized: true,  // 초기화되지 않은 세션도 저장할지 여부
    cookie: { 
        maxAge: 24*60*60*1000        // 쿠키의 수명 (밀리초 단위)
    }
})

app.use(sessionMiddleware);     //세션 미들웨어 사용

io.use((socket, next) => {      //소켓과 세션 연동
    sessionMiddleware(socket.request, {}, next)
})

app.get('/', function (req, res) {
    res.render('index')
})

app.use('/', userRouter);
app.use('/channels', serverRouter);

app.get('/channels/@me', (req, res) => {
    res.render('channel');
})

app.get('/api/servers', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'})
    }
    
    const username = req.session.username;
    //console.log(username)
    const query = `SELECT id, servername, participants FROM ServerInfo
    WHERE JSON_CONTAINS(participants, JSON_QUOTE(?))`;

    db.query(query, [username], (error, results) => {
        if (error) {
            return res.status(500).json({error: 'DB Query failed!'})
        }
        //console.log(results)
        res.json(results)
    })
})

app.get('/api/server/:id', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'})
    }
    const parent_id = req.params.id;
    console.log('pid', parent_id)
    const query = `SELECT id, name FROM ChatTable
    WHERE parent_id = ?`;
    db.query(query, [parent_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        console.log(results)
        res.json(results)
    })
})


//setupSocket(server);

server.listen(3000,  () => {
    console.log("start server at port 3000")
})