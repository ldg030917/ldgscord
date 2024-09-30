//기본적인 매칭에 대한 파일

const express = require('express')
const router = express.Router()
const socketIo = require('socket.io')

let WaitingQueue = [];      //대기열
let room = {};      //방 목록
let roomcnt = 0;

router.get('/', )

function setupSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log(`user connected by ${socket.id} MATCH`);
        sid = socket.id
        socket.on('joinQ', () => {        //매칭 대기열 요청
            WaitingQueue.push(sid);
            
            console.log(`${sid} joined`);
            
            if (WaitingQueue.length >= 2) {
                let user1 = WaitingQueue.shift();
                let user2 = WaitingQueue.shift();
                let roomId = `${user1}${user2}`
                room[roomId] = [user1, user2];
                
                socket.join(roomId);
                io.to(user1).emit('matched', roomId);
                io.to(user2).emit('matched', roomId);

                console.log(`Room ${roomId} created by ${user1}, ${user2}`);
            }
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${sid}`);
            // 대기열에서 제거
            //waitingQueue = waitingQueue.filter(id => id !== sid);         //fucking waitingQueue
        })
    })
}

module.exports = {router, setupSocket}