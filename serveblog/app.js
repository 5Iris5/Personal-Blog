var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

// 连接服务器
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log('数据库连接成功')})
    .catch(()=>{console.log('数据库连接成功')})

// APP实例
var app = express();

// 路由中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 处理路由之前，允许跨域  ->  后端需要提供给前端允许跨域的接口
app.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Credentials': true,  // 允许携带cookie
        'Access-Control-Allow-Origin': req.headers.origin || '*',  // 哪些源可以跨域
        'Access-Control-Allow-Headers': 'Content-Type',   //  请求头信息
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',  //  允许哪些请求方法
        'Content-Type': 'application/json; charset=utf-8'   // 内容格式
    })
    if(req.method === 'OPTIONS') {  
        res.sendStatus(200);
    }else{
        next();
    }
});

// 设置session -> 用户一开始访问页面,后台就会分配给他对应的session
app.use(require('./middleware/session'))

// 设置路由
app.use('/', indexRouter);

module.exports = app;
