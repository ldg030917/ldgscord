const express = require('express')
const router = express.Router()
const socketIo = require('socket.io')

function setupSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        socket.on('send', (data) => {
            console.log('msg:', data)
            io.emit('update', {
                uid: 'AA',
                msg: data
            });
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected`);
        })
    })
}

module.exports = setupSocket