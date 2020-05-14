var express = require('express');
var router = express.Router();

// 文章相关接口
router.use('/article', require('./article/index'));

// 注册相关接口
router.use('/register', require('./register/index'));

// 登录接口
router.use('/login', require('./login/index'));

// 最近访客接口
router.use('/visitor', require('./visitor/index'));

// 上传图像接口
router.use('/upload', require('./upload/index'));

// 留言板接口
router.use('/guest', require('./guest/index'));

module.exports = router;
