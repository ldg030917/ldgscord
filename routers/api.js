const express = require('express');
const db = require('../config/db');

const router = express.Router();


//사용자의 전체 서버 목록 조회
router.get('/servers', (req, res) => {
    console.log('Server List Request!');
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'})
    }
    
    const uid = req.session.user_id;
    //console.log(username)
    const query = `SELECT S.id, S.name FROM serverinfo S JOIN membertable M on S.id = M.sid
    WHERE M.uid = ?`;

    db.query(query, [uid], (error, results) => {
        if (error) {
            return res.status(500).json({error: 'DB Query failed!'})
        }
        console.log(results)
        res.json(results)
    })
})

//서버의 채널 목록 조회
router.get('/servers/:server_id/channels', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'})
    }
    const parent_id = req.params.server_id;
    console.log('pid', parent_id)
    const query = `SELECT id, name FROM serverinfo
    WHERE parent_id = ?`;
    db.query(query, [parent_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        console.log(results)
        res.json(results)
    })
})

//채널 내 메시지 조회
router.get('/channels/:channel_id/messages', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const channel_id = req.params.channel_id;
    const query = `SELECT U.username, M.content, M.sent_at FROM messages M 
    JOIN usertable U ON M.user_id = U.id 
    WHERE M.channel_id = ? ORDER BY M.sent_at asc`;
    db.query(query, [channel_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        res.json(results);
    })
})

//서버 생성
router.post('/servers', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const name = req.body.name;
    const uid = req.session.user_id;
    //서버 추가
    db.query('INSERT INTO serverinfo (name, parent_id) VALUE (?, ?)', [name, null], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});        
        const pid = results.insertId;
        //서버와 유저 관계 추가
        db.query('INSERT INTO membertable (sid, uid) VALUES (?, ?)', [pid, uid], (error, results) => {      
            if (error) return res.status(500).json({error: 'DB Query failed!'});
            return res.status(200).json({server_id: pid});
        });
    });
})

//서버에 채널 추가
router.post('servers/:server_id/channels', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    //console.log('채널 생성', req.body)
    const name = req.body.name;
    const server_id = req.params.server_id;
    db.query('INSERT INTO serverinfo (name, parent_id) VALUE (?, ?)', [name, server_id], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        return res.json({channel_id: results.insertId});
    })
})

//서버 삭제
router.delete('/servers/:server_id', (req, res) => {
    if (!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const cid = req.params.server_id;
    db.query('DELETE FROM serverinfo WHERE id = ?', [cid], (error, results) => {
        if (error) return res.status(500).json({error: 'DB Query failed!'});
        console.log(`channel deleted!, id: ${cid}`);
    })
})

//친구 목록 조회
router.get('/friend', (req, res) => {
    if(!req.session.is_logined) {
        return res.status(401).json({error: '로그인 필요'});
    }
    const uid = req.session.uid;
    query = `SELECT 
        CASE 
            WHEN fr.sender_id = ? THEN u2.id 
            ELSE u1.id 
        END AS fid,
        CASE
            WHEN fr.sender_id = ? THEN u2.username
            ELSE u1.username
        END AS fname
    FROM friend_req fr
    JOIN usertable u1 ON fr.sender_id = u1.id
    JOIN usertable u2 on fr.receiver_id = u2.id
    WHERE (fr.sender_id = ? or fr.receiver_id = ?) and fr.status = 'accepted'`
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
    query = `SELECT u.id, u.username 
    FROM friend_req fr
    JOIN usertable u ON u.id = fr.sender_id
    WHERE receiver_id = ? and status = 'pending'`;
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

    query1 = `SELECT u.* FROM usertable u
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

router.patch('/friend_req', (req, res) => {
    const sender_id = req.body.sender_id;
    const receiver_id = req.session.uid;
    let isaccept = req.body.isaccept;
    let status = 'accepted';
    if (!isaccept) status = 'rejected';

    query = `UPDATE friend_req
    SET status = ?
    WHERE sender_id = ? AND receiver_id = ?`;
    db.query(query, [status, sender_id, receiver_id], (error) => {
        if(error) return res.status(500).json({error: 'DB Query failed!'});
    })
})

module.exports = router