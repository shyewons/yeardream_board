// MongoDB 연결
const mongo = require('mongoose');

function connectDB() {
    mongo.set('debug', true); // 실행된 쿼리를 로그에 출력, 서비스 시에는 false로 바꿀 것
    const url = 'mongodb://localhost:27017/board_project';
    mongo.connect(url); // url 주소로 직접 mongoDB 서버에 접속을 시도하는 코드
    const db = mongo.connection; // 연결 상태/객체를 가져오는 코드

    db.on('error', () => {console.log('DB 접속 실패')});
    db.on('open', () => {console.log('DB 접속 완료')});
}

module.exports = connectDB; // CommonJS 방식 : require('./db');로 받아오려면 동일한 한 쌍의 코드로 보내줘야한다.