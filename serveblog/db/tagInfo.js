const mongoose = require('mongoose');

let tagInfo = mongoose.model('tagInfo', new mongoose.Schema({
	tags: [String],
	num: Number
}))

// 模拟数据  tags标签路由数量
// tagInfo.create({
// 	tag: ['Html', 'HTML5', 'CSS', 'CSS3', 'JavaScript', 'Nodejs', 'Vue', 
// 	'软件', 'MongoDB', '数据库', '项目', 'React', '日常唠嗑', 'Linux', '小案例',
// 	'每日一题', 'Canvas', '读书笔记', '英语', '其他'],
// 	num: 20
// })

module.exports = tagInfo;