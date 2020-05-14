/*
* 注册验证码的时间  ->  记录时间
*   req.session.registerVCodeTime
*
* 注册验证码的svg  ->  防止来自前端的无休止注册
*   req.session.registerVCode.text
*   req.session.registerVCode.data
*
* 登录之后存储用户所有信息 ->  记录用户的登录状态
*   req.session.login
* */


//  安全性  ->  前端不同用户的cookie,后台都会有唯一的session与之对应
var session = require('express-session');
var connectMongo = require('connect-mongo')(session);

// 设置session -> 用户一开始访问页面,后台就会分配给他对应的session
module.exports = session({
	secret: 'Iris',  //密钥,任意一个字符,用于加密
	cookie: {maxAge: 10*60*1000},  //给前端设置的cookie有效时长
	rolling: true,  //每次用户于后端交互时,刷新
	resave: false,   //是否每次重新存储session
	saveUninitialized: false,  //初始化
	store: new connectMongo({url: 'mongodb://localhost:27017/blog'})  // 将session存储到数据库
})