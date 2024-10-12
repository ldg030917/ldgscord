const express = require("express");
const router = express.Router();
var db = require('../config/db');

function createServer(pid, name) {
    db.query('INSERT INTO serverInfo (servername, parent_id) VALUE (?, ?)', [name, pid], (error, results) => {
        if (error) console.log('DB Query Failed!');
        return results.insertID  //삽입된 서버의 id 가져오기
    })
}



router.post('/create', (req, res) => {
    var servername = req.body.servername;
    var uid = req.session.uid;
    sid = createServer(null, servername);       //부모가 없는
    db.query('INSERT INTO memberTable (sid, uid) VALUES (?, ?)', [sid, uid], (error, results) => {
        if (error) console.log('DB Query Failed!');
    })
    createServer(sid, '일반')        //기본적인 채팅 채널 추가

    res.send(`<script type="text/javascript">alert("채널 생성이 완료되었습니다!");
            document.location.href="/channels/@me";</script>`);
})


router.get('/:id', (req, res) => {
    if (!req.session.is_logined) {
        res.redirect('http://localhost:3000/')
    }
    res.render('channel')
})

router.get('/:id/:id2', (req, res) => {
    if (!req.session.is_logined) {
        res.redirect('http://localhost:3000/')
    }
    res.render('channel')
})

module.exports = router