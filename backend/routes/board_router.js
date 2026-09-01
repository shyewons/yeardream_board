const multer = require('multer');
const upload = multer();
const express = require('express');
const router = express.Router();
/*
* 라우팅 기능만 따로 떼어서 관리할 수 있는작은 Express 앱 같은 객체
* 그래서 router.get(), router.post()를 할 수 있던 것
* */

const Board = require('../models/board_model');
/*
* 모델은 DB에 어떤 규칙으로 어떻게 저장하고, 조회하고, 수정하고, 삭제할지 다루는 객체
* DB에 어떻게 저장해야하는가 라는 생각이 들면 모델을 이용해야겠다라고 인지하면 됨.
* mongoose.model('Board', boardSchema)으로 만든 model 객체를 require
* */

// 게시글 리스트 보기 (/board/list, /board)
router.get(['/list', '/'], async (req, res) => {
    // find() → 조건에 맞는 데이터를 조회
    // 조건을 걸고 싶다면 find({ category: 'notice' }) 같은 형식으로 조건을 걸 수 있음

    /*
    * Board.find()는 배열을 주는 게 아니라 “DB 조회 작업을 나타내는 Query 객체”를 반환하고
    * → DB 조회 실행
    * → 조회 완료까지 기다림
    * → 실제 게시글 배열 반환
    * → list에 저장 까지 되어야 하는데 await를 사용하지 않아서 쿼리 객체만 반환한 것
    * await 자체가 “데이터를 받아오는 기능”을 하는 건 아니고,
    * Promise/비동기 작업이 끝날 때까지 기다린 뒤 그 결과값을 꺼내주는 역할
    */

    let list = await Board.find()
                            .sort({"createdAt": -1}) // 생성일 내림차순
                            .lean();
    // .lean()를 써야하는 이유는 아직 이해 안된다.
    /*
    * # .lean()를 사용한 이유
    * .lean()은 단순 JS객체로 만들어 준다.
    * .lean()를 하지 않은 상태는 Mongoose Document 로 board.save(); 등의 Mongoose Document 기능을 사용할 수 있게된다.
    * 그래서 현재와 같이 단순 리스트 조회의 경우에는 그대로 JSON으로 내보내기만 하기 때문에 .lean()을 쓰는게 더 자연스럽다
    * */

    return res.json({'success': true, 'data': {'info': list, 'msg': '게시글 리스트 조회 완료'}});
});

/*
* 생각해보니 게시글이 없어서 볼 리스트가 없다.
* 우선 페이지가 열리는지 정도만 확인해보자.
* module.exports = router; 를 안해서 오류가 발생했다. 꼭 넣어주자
* */

// 게시글 작성 (/board/write)
/* 
* form으로 받은 데이터는 서버가 multipart/form-data를 제대로 파싱할 수 있도록 
* multer 패키지를 설치한 후 미들웨어로 사용해야 한다
* ? 미들웨어는 라우터로 가기 전에 넣어두는 것이 아닌가?
* → 라우트 안에서 이렇게 중간 인자로 넣는 것도 미들 웨어다.
*/
router.post('/write', upload.none(), async (req, res) => {
    // req를 통해 데이터를 받아온다. 내가 원하는 데이터는 body에 담겨온다.
    // 테스트 데이터를 담아서 보내려니까 이제 test.http의 필요성을 알았다.
    // res.json({})를 사용해야 응답해 줘야 test.http가 멈출 수 있다.
    const {title, content, writer} = req.body;
    try {
        // 여기다 Board 객체를 사용한 비동기 코드를 작성
        // 비동기 코드가 실행되다 실패할 수 있으니 try, catch를 사용
        let result = await Board.create({title, content, writer});
        return res.json({'success': true, 'data': {'info' : result, 'msg' : '게시글 작성 완료'}});
    } catch(e) {
        console.log(e, 'CODE :'+e.code);
        return res.json({'success': false,  'data': {'info' : {}, 'msg' : e.code}});
    }
});

// 게시글 상세보기
router.get('/detail/:id', async (req, res) => {
    const {id} = req.params;
    // findById(req.params.id) 과 동일한 코드
    const board = await Board.findOne({_id : id}).lean();

    if(board == null) {
        return res.json({'success': false, 'data':{'info': {}, 'msg': '게시글이 존재하지 않습니다.'} });
    }
    return res.json({'success': true, 'data':{'info': board, 'msg': '상세보기 완료'}});
});

// 게시글 삭제
router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    /*
    * findOneAndDelete()
    * 조건에 맞는 document(문서)를 찾아 삭제한다.
    * ({})로 빈 객체를 보낸다면 첫번째로 매칭되는 문서를 삭제한다.
    * 조건에 맞는 문서가 없다면 삭제되지 않고 null을 반환한다.
    * */
    const board = await Board.findOneAndDelete({_id:id}).lean();

    if(board == null) {
        return res.json({'success': false, 'data':{'info': board, 'msg': '삭제 실패'}});
    }
    return res.json({'success': true, 'data':{'info': board, 'msg': '삭제 완료'}});
});

module.exports = router;