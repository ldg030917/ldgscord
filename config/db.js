const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host     : process.env.DB_HOST,     //db 서버 주소 지정
    user     : process.env.DB_USER,     //로그인 사용자 이름
    password : process.env.DB_PASSWORD,      //비밀번호
    database : process.env.DB_DATABASE     //연결할 db 이름
})

db.connect((err) => {
    if (err) {
        console.error('db connect error : ', err.stack);
        return;
    }
    console.log('db connected');
});    //연결 시도

db.query('SELECT DATABASE()', (error, results) => {
    console.log('현재 연결된 데이터베이스:', results[0]['DATABASE()']);
})

module.exports = db  //db를 다른 파일에서 사용할 수 있도록 함 

//이 파일을 다른 곳에서 require()를 통해 불러오면 MySQL 데이터베이스에 연결된 db 객체를 사용할 수 있게 됨