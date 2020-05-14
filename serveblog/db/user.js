const mongoose = require('mongoose');

let user = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
	pwd: {type: String, require: true},
	photo: {type: String, default: 'http://localhost:3000/images/defaultSurface.jpg'},
	// 注册时间
	// regDate: {type: Number, default: new Date().getDate()},
	regDate: {type: Number, default: Date.now},
	// 是否权限禁用
	disabled: {type: Boolean, default: false},
	// 是否管理员
	admin: {type: Boolean, default: false}
}))

module.exports = user