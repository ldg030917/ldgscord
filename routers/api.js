const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/servers', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'})
    }
    
    const uid = req.session.uid;
    //console.log(username)
    const query = `SELECT S.id, S.servername FROM ServerInfo S JOIN memberTable M on S.id = M.sid
    WHERE M.uid = ?`;

    db.query(query, [uid], (error, results) => {
        if (error) {
            return res.status(500).json({error: 'DB Query failed!'})
        }
        //console.log(results)
        res.json(results)
    })
})

router.get('/server/:id', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'})
    }
    const parent_id = req.params.id;
    console.log('pid', parent_id)
    const query = `SELECT id, servername FROM serverInfo
    WHERE parent_id = ?`;
    db.query(query, [parent_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        console.log(results)
        res.json(results)
    })
})

router.get('/channel/:id', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const channel_id = req.params.id;
    const query = `SELECT U.username, M.content, M.sent_at FROM Messages M 
    JOIN UserTable U ON M.user_id = U.id 
    WHERE M.channel_id = ? ORDER BY M.sent_at asc`;
    db.query(query, [channel_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        res.json(results);
    })
})

router.post('/create/server', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const servername = req.body.servername;
    const uid = req.session.uid;
    //서버 추가
    db.query('INSERT INTO serverInfo (servername, parent_id) VALUE (?, ?)', [servername, null], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});        
        const pid = results.insertId;
        //서버와 유저 관계 추가
        db.query('INSERT INTO memberTable (sid, uid) VALUES (?, ?)', [pid, uid], (error, results) => {      
            if (error) return res.status(500).json({error: 'DB Query failed!'});
            //기본적인 채팅 채널 추가
            db.query('INSERT INTO serverInfo (servername, parent_id) VALUE (?, ?)', ['일반', pid], (error, results) => {
                if (error) return res.status(500).json({error: 'DB Query failed!'});
                return res.json(pid);
            });
        });
    });
})


router.post('/create/channel', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    //console.log('채널 생성', req.body)
    const name = req.body.channelname;
    const server_id = req.body.sid;
    db.query('INSERT INTO serverInfo (servername, parent_id) VALUE (?, ?)', [name, server_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        return res.json(results.insertId);
    })
})

router.delete('/delete/:id', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const cid = req.params.id;
    db.query('DELETE FROM serverInfo WHERE id = ?', [cid], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        console.log(`channel deleted!, id: ${cid}`);
    })
})

router.get('/friend', (req, res) => {
    if(!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const uid = req.session.uid;
    query = `SELECT 
        CASE 
            WHEN f.uid1 = ? THEN u2.id 
            ELSE u1.id 
        END AS fid,
        CASE
            WHEN f.uid1 = ? THEN u2.username
            ELSE u1.username
        END AS fname
    FROM friendship f 
    JOIN userTable u1 ON f.uid1 = u1.id
    JOIN userTable u2 on f.uid2 = u2.id 
    WHERE f.uid1 = ? or f.uid2 = ?`
    db.query(query, [uid, uid, uid, uid], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        res.json(results);
    })
})

router.get('/friend_req', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const receiver_id = req.session.uid;
    query = `SELECT sender_id FROM friend_req WHERE receiver_id = ? and status = 'pending'`;
    db.query(query, [receiver_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        return res.json(results);
    })
})

router.post('/friend_req', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const sender_id = req.session.uid;
    const receiver_id = req.body.receiver_id;

    query1 = `SELECT u.* FROM userTable u
    WHERE u.id = ?`;
    query2 = `INSERT INTO friend_req (sender_id, receiver_id) VALUE (?, ?)`;
    db.query(query1, [receiver_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        if (results.length > 0) {
            db.query(query2, [sender_id, receiver_id], (error, results) => {
                if (error) return res.status(500).json({error: 'DB Query failed!'});
            })
        }
        else {
            return res.json('');    //없을 시 없다고 반환?
        }
    })
})

module.exports = router