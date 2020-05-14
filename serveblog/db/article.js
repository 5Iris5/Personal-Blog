const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let article = mongoose.model('article', new Schema({
	type: {type: String, required: true},
	title: {type: String, required: true},
	content: {type: String, required: true},
	date: {type: Date, default: Date.now},
	surface: {type: String, default: 'http://localhost:3000/images/defaultSurface.jpg'},
	pv: {type: Number, default: 0},
	tag: {type: String, required: true},
	comment: [{type: Schema.Types.ObjectId, ref: 'comment'}]
}))

// 模拟数据
// for(let i = 0; i < 100 ;i++){
// 	article.create({
// 		type: ['原创', '转载'][Math.random()*2|0],
// 		title: `第${i+1}篇文章`,
// 		content: (''+i+i+i+i+i+'吼吼吼吼吼吼吼我是文章内容').repeat(10),
// 		tag: ['HTML5', 'CSS3', 'JavaScript', 'Canvas', '每日一题', '小案例', 'Nodejs', 'Vue', '软件', '项目', '日常唠嗑', 'MongoDB'][Math.random()*12|0],
// 		pv: Math.random()*1000|0
// 	})
// }

module.exports = article;