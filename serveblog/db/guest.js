const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let guest = mongoose.model('guest', new Schema({
    // 关联用户表
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},

    // 留言内容
    content: {type: String, required: true},

    // 日期
    date: {type: Date, default: Date.now},

    // 子留言
    children: [
        {
            // 子留言用户
            user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
            // 子留言内容
            content: {type: String, required: true},
            // 子留言评论对象
            replyuser: {type: String, required: true},
            // 子留言日期
            date: {type: Date, default: Date.now}
        }
    ]
}));

module.exports = guest;