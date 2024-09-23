const mysql = require('mysql2')

const db = mysql.createConnection({
    host     : 'localhost',     //db 서버 주소 지정
    user     : 'admin',     //로그인 사용자 이름
    password : '1234',      //비밀번호
    database : 'testdb'     //연결할 db 이름
})

db.connect()    //연결 시도

module.exports = db  //db를 다른 파일에서 사용할 수 있도록 함 

//이 파일을 다른 곳에서 require()를 통해 불러오면 MySQL 데이터베이스에 연결된 db 객체를 사용할 수 있게 됨