const express = require('express');
const router = express.Router();
var db = require('../config/db');
const bcrypt = require('bcrypt')



router.get('/login', (req, res) => {        //로그인 화면
    res.render('login')
})


router.post('/login', (req, res) => {       //로그인
    var username = req.body.username
    var password = req.body.password
    try {
        if (username && password){
            db.query('SELECT id, password FROM userTable WHERE username = ?', [username], async function(error, results, fields) {
                // DB에 같은 회원이 있는지 확인
                if (error) throw error;
                if (results.length > 0){
                    const isMatch = await bcrypt.compare(password, results[0].password)     //result 그대로 넣지 말기
                    if (isMatch) {
                        req.session.is_logined = true;      // 세션 정보 갱신
                        req.session.username = username;
                        req.session.uid = results[0].id;
                        req.session.save(function () {
                            res.redirect('/channels/@me');
                        });
                    }
                    else {
                        res.send(`<script type="text/javascript">alert("비밀번호가 틀렸습니다!");
                        document.location.href="/login";</script>`);
                    }
                }
                else {
                    res.send(`<script type="text/javascript">alert("계정이 존재하지 않습니다!");
                    document.location.href="/login";</script>`);
                }
            })
        }
        else {
            res.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
            document.location.href="/login";</script>`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error!")
    }
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var password2 = req.body.password2
    if (password == password2) {
        try{
            var hpassword = await bcrypt.hash(password, 10)
            db.query("SELECT * FROM userTable WHERE username = ?", [username], function (error, results, fields) {
                if (error) throw error;
                if (results.length <= 0) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
                    db.query('INSERT INTO usertable (username, password) VALUES(?,?)', [username, hpassword], function (error, data) {
                        if (error) throw error2;
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

module.exports = router