const express = require('express');
const router = express.Router();
var db = require('../config/db');
const bcrypt = require('bcrypt');



router.get('/login', (req, res) => {        //로그인 화면
    res.render('login', {layout: 'layouts/layout2'})
})


router.post('/login', (req, res) => {       //로그인
    var user_id = req.body.user_id
    var password = req.body.password
    try {
        db.query('SELECT user_id, password, nickname FROM users WHERE user_id = ?', [user_id], async function(error, results) {
            // DB에 같은 회원이 있는지 확인
            if (error) throw error;
            if (results.length > 0){
                const isMatch = await bcrypt.compare(password, results[0].password)     //result 그대로 넣지 말기
                if (isMatch) {
                    req.session.is_logined = true;      // 세션 정보 갱신
                    req.session.user_id = user_id;
                    req.session.nickname = results[0].nickname;
                    req.session.save(function () {
                        res.redirect('/channels/@me');
                    });
                }
                else {
                    res.status(400).json({ message: '비밀번호가 틀렸습니다.' });
                }
            }
            else {
                res.status(400).json({ message: '계정이 존재하지 않습니다.' });
            }
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error!")
    }
})

router.get('/register', (req, res) => {
    res.render('register', {layout: 'layouts/layout2'})
})

router.post('/register', async (req, res) => {
    var user_id = req.body.user_id
    var password = req.body.password
    var password2 = req.body.password2
    if (password == password2) {
        try{
            var hpassword = await bcrypt.hash(password, 10)
            db.query("SELECT * FROM users WHERE user_id = ?", [user_id], function (error, results) {
                if (error) throw error;
                if (results.length <= 0) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
                    db.query('INSERT INTO users (user_id, password) VALUES(?,?)', [user_id, hpassword], function (error2, data) {
                        if (error2) throw error2;
                        res.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                        document.location.href="/login";</script>`);
                    });
                }
                else {  //같은 아이디 존재
                    res.send(`<script type="text/javascript">alert("같은 아이디의 회원이 존재합니다."); 
                    document.location.href="/register";</script>`);
                }
            })
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server Error!")
        }
    }
    else {   //비밀번호 일치 X
        res.send(`<script type="text/javascript">alert("비밀번호가 일치하지 않습니다."); 
        document.location.href="/register";</script>`);
    }
})

router.get('/invite/:encodedpath', (req, res) => {
    if (!req.session.is_logined) {
        res.send(`<script type="text/javascript">alert("로그인을 해주세요!"); 
        document.location.href="/";</script>`);
    }
    const path = atob(req.params.encodedpath);
    const sid = path.split('/')[2];
    const uid = req.session.uid;
    db.query('SELECT * FROM membertable WHERE uid = ? AND sid = ?', [uid, sid], (error, results) => {
        if (error) throw error;
        if (results.length <= 0) {
            db.query('INSERT INTO membertable (uid, sid) VALUES(?, ?)', [uid, sid], (error, results) => {
                if (error) throw error2;
            })
        }
    })
    res.redirect(path);
})

module.exports = router