const express = require("express");
const router = express.Router();
var db = require('../config/db');
const createChat = require('./cRouter');

let ch_id = 1

router.post('/create', (req, res) => {
    var servername = req.body.servername
    var participants = JSON.stringify([req.session.username]);
    db.query('SELECT MAX(id) FROM ServerInfo', (error, results) => {
        if (error) {
            console.log('error:', error)
        }
        else {
            
            var channel_ids = JSON.stringify([ch_id])       //대충 돌아가게 만들어둠 -> 채팅 채널을 만들고 그 채널 아이디를 넣게
            ch_id = ch_id + 1       //채팅 채널 id 번호 증가 
            db.query('INSERT INTO ServerInfo (servername, participants, channel_ids) VALUES (?, ?, ?)', [servername, participants, channel_ids], (error, results) => {
                if (error) {
                    console.log('error:', error)
                }
                createChat(results.insertId, '일반')        //기본적인 채팅 채널 추가
                res.send(`<script type="text/javascript">alert("채널 생성이 완료되었습니다!");
                        document.location.href="/channels/@me";</script>`);
            })
        }
    })
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