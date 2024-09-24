const express = require('express');

const chatRouter = (io) => {
    const router = express.Router();
    console.log("chat start")
    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/templates/chat.html'); // HTML 파일을 클라이언트에 전송
    });

    // 소켓 연결 설정
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id); // 연결 확인

        socket.on('send', (msg) => {
            console.log('Received message:', msg); // 메시지 수신 확인
            io.emit('send', msg); // 모든 클라이언트에 메시지 전송
        });
        
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return router; // 라우터 반환
};

// function send() {
//     var message = document.getElementById()
// }

module.exports = chatRouter;
