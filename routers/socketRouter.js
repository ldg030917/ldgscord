const express = require('express')
const router = express.Router()
const moment = require('moment');

const userSockets = {};

function setupSocket(io, db) {
    io.on('connection', (socket) => {
        const session = socket.request.session;
        //console.log(session)
        let uid = session.uid;
        userSockets[uid] = socket.id;
        
        socket.on('send', (data) => {
            const date = moment().format('YYYY.MM.DD. HH:mm:ss');
            console.log('send:', data)
            query = `INSERT INTO Messages (user_id, channel_id, content, sent_at) VALUES (?, ?, ?, ?)`  //존재하는 서버, 채널인지 확인하고 저장하기
            db.query(query, [uid, data.cid, data.msg, date], (error, results) => {
                if (error) throw error;
            })
            db.query('SELECT M.uid FROM memberTable M JOIN serverinfo S ON S.parent_id = M.sid WHERE S.id = ?', [data.cid], (error, results) => {
                if (error) throw error;
                results.forEach(result => {
                    const socketid = userSockets[result];
                    socket.emit('update', {
                        cid: data.cid
                    }, socketid);
                })
            })
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected`);
        })
    })
}

module.exports = setupSocket