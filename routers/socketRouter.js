const express = require('express')
const router = express.Router()
const socketIo = require('socket.io')
const moment = require('moment');

function setupSocket(io, db) {
    io.on('connection', (socket) => {
        const session = socket.request.session;
        //console.log(session)
        let uid = session.uid;
        let username = session.username;
        
        const date = moment().format('YYYY.MM.DD. HH:mm');
        socket.on('send', (data) => {
            console.log('send:', data)
            query = `INSERT INTO Messages (user_id, channel_id, content, sent_at) VALUES (?, ?, ?, ?)`  //존재하는 서버, 채널인지 확인하고 저장하기
            db.query(query, [uid, data.cid, data.msg, date], (error, results) => {
                if (error) throw error;
            })
            io.emit('update', {
                cid: data.cid
            });
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected`);
        })
    })
}

module.exports = setupSocket