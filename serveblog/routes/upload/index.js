const express = require('express');
let router = express.Router();

/*
* 图片上传
* 需要用到multer依赖包
* element-ui里面的avatar上传组件，不携带cookie
* */
router.use('/avatar', require('./avatar'))

module.exports = router;