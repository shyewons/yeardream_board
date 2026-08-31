// mongoose를 이용하여 스키마 설정을 한다.
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    // 필드 구조 설정
    title : {
        type: String,
        required: [true, '제목은 필수 입니다.'],
        trim : true,
        minlength: [5, '제목을 5자 이상 적어주세요.'],
        maxlength: [30, '제목은 30자 이하로 적어주세요.']
    },
    content : {
        type: String,
        required: [true, '내용은 필수 입니다.'],
        trim: true
    },
    writer: {
        type: String,
        required: [true, '작성자 입력은 필수 입니다.'],
        trim : true
    },
    view : {
        type: Number,
        default: 0
    },
    like : {
        type: Number,
        default: 0
    }
}, {
    //이 스키마를 어떻게 작동시킬 지에 대한 옵션
    collection : 'board', //DB의 collection 이름
    timestamps: true,   // 타임스탬프 사용여부
    id : false
    /*
    * mongoDB는 기본적으로 _id 필드를 생성한다
    * Mongoose는 _id를 기반으로 id라는 가상 필드를 제공한다.
    * id : false를 함으로써 Mongoose의 가상필드 id 필드 생성을 비활성화 한다.
    */
});

// mongoose.model() → 스키마를 실제 DB CRUD가 가능한 Model로 변환 하는 함수
// model의 첫번째 인자는 mongoose에서 관리하는 이름이다
module.exports = mongoose.model('Board', boardSchema);