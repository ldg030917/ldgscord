//채팅 채널 관련 함수, 라우터

const express = require('express');
var db = require('../config/db');

function CreateChat(parent, chatname) {
    query = 'INSERT INTO ChatTable (name, parent_id) VALUE (?, ?)'
    db.query(query, [chatname, parent], (error, results) => {
        if (error) return error;
        return results.insertID  //삽입된 채팅id 가져오기
    })
}


module.exports = CreateChat