require('dotenv').config();

const express = require('express');
const router = express.Router();
const Member = require('../models/member_model');

// 로그인을 위한 JWT 라이브러리 가져오기
const jwt = require('jsonwebtoken');

// 회원가입
router.post('/join', async (req, res) => {
    const {id, pass, name, phone} = req.body;
    try {
        const member = await Member.create({id, pass, name, phone});
        // 여기서는 왜 lean를 안하고 toObject를 한걸까?
        // lean은 "조회할 때부터 Mongoose Document를 만들지 말고 일반 객체로 바로 받아라"
        // 여기서 toObject를 한 이유는 응답용 객체에서만 pass 를 지우기 위해 result로 따로 복사해서 저장한 것
        // member에서는 pass가 남아있다.

        // toObject는 mongoDB의 메서드다
        const result = member.toObject();

        // JS에서 특정 속성을 지우는 연산자이다
        delete result.pw;

        return res.json({'success': true,  'data': {'info' : result, 'msg' : '회원가입 완료'}});
    } catch(e) {
        console.log(e.code);
        return res.json({'success': false,  'data': {'info' : {}, 'msg' : e.code}});
    }
});

// 로그인
router.post('/login', async (req, res) => {
    const {id, pass} = req.body;
    const member = await Member.findOne({id, pass}).lean();

    // jwt 생성
    if (member == null) {
        return res.json({'success': false,  'data': {'info' : {}, 'msg' : '아이디와 비밀번호를 확인해 주세요.'}});
    }

    // jwt.sign({payload, secretKey, option})
    // payload : 토큰에 담을 정보
    // secretKey : 토큰 서명에 사용할 비밀키
    // option : 토큰 설정
    // process.env.SECRET → .env 파일에 있는 SECRET 값을 사용한다.
    const token = jwt.sign({"id": id, "pass": pass}, process.env.SECRET, {expiresIn: '1h'});
    return res.json({'success': true, 'data' : {'id':id, 'token': token} });
});

module.exports = router;
