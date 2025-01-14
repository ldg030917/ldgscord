const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,     //db 서버 주소 지정
    user     : process.env.DB_USER,     //로그인 사용자 이름
    password : process.env.DB_PASSWORD,      //비밀번호
    database : process.env.DB_DATABASE,     //연결할 db 이름
    waitForConnections: true,  // 연결이 없을 경우 대기
    connectionLimit: 10,  // 최대 연결 수
    queueLimit: 0         // 대기열에 제한 없음
})

module.exports = pool.promise();