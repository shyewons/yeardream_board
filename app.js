// Express 서버 시작 / middleware / routes 연결
/*
* 1. require('express') → node_modules에 설치된 express 패키지를 가져온다
* 2. app = express() → express()를 실행해서 만들어진 Express 애플리케이션 객체를 app 변수에 담은 것
* 3. require('cors') → cors 패키지 불러오기
* 4. require('./db') → db.js 작성
* */
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');

// middle ware : 요청이 라우터에 도착하기 전 거쳐가는 중간단계
// use : 미들웨어를 Express 앱에 등록하는 메서드 "이 서버로 요청이 들어오면 이 처리를 거쳐라"
app.use(cors()); // 이 요청을 다른 출처에서 보내도 허용
app.use(express.json()); // 요청으로 들어온 JSON 형식의 body를 읽고, 파싱해서 req.body로 쓸 수 있게 해라

app.use('/board', require('./routes/board_router')); // /board로 시작하는 요청은 board_router.js에서 처리
app.use('/member', require('./routes/member_router')); // /board로 시작하는 요청은 board_router.js에서 처리

connectDB();

/*
* app.all('url', function) → 특정 url에서 get,post, delete, put 등 http 메서드 종류에 상관없이 전부 처리하는 메서드
* req → 사용자가 서버로 보낸 요청 정보 전체, req.body / req.params / req.query로 접근할 수 있다.
* res → 응답을 보내는 객체, "그 요청에 대한 결과입니다."
* */
app.get('/',(req, res) => {
    res.send('/board를 통해 게시판을 이용해 보세요.');
});

// Express 서버를 실제로 시작해서 요청을 기다리는 코드
app.listen(80, () => console.log('http://localhost'));