const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    // 필드 구조 설정
    id : {
        type: String,
        required: [true, 'id는 필수 입력입니다.'],
        trim : true,
        minlength: [5, 'id는 5자 이상 적어주세요.'],
        maxlength: [20, 'id는 20자 이하로 적어주세요.']
    },
    pass : {
        type: String,
        required: [true, 'pass는 필수 입력입니다.'],
        trim : true,
        minlength: [5, 'pass는 5자 이상 적어주세요.'],
        maxlength: [20, 'pass는 20자 이하로 적어주세요.']
    },
    name : {
        type: String,
        required: [true, '닉네임은 필수 입력입니다.'],
        trim : true,
        minlength: [2, '닉네임는 2자 이상 적어주세요.'],
        maxlength: [10, '닉네임은 10자 이하로 적어주세요.']
    },
    phone: {
        type: String,
        trim: true,
    },
    grade: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    collection: 'member',
    timestamps: true,
    id: false
});

module.exports = mongoose.model('Member', memberSchema);