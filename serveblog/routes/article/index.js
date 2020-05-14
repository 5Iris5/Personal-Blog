// article路由下的二级路由
const express = require('express');
let router = express.Router();

// 关联article数据库表
let article = require('../../db/article');
// 关联tagInfo数据库表
let tagInfo = require('../../db/tagInfo');

// 标签云接口
router.post('/getTags', (req, res) => {
    tagInfo.findOne({}, {_id:0,__v:0})
        .then(data => {
            console.log(data)
            res.send({
                code: 0,
                msg: '请求成功',
                data
            })
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: '服务器错误',
                data: null
            });
        });
})

// 热门文章接口
router.post('/getHot', (req, res) => {
	article.find({}, {__v:0}, {sort: {pv: -1}, skip: 0, limit: 8})
		.then((data) => {
			res.send({
				code: 0,
				msg: '请求成功',
				data
			})
		})
		.catch(()=>{
			res.send({
				code: 4,
				msg: '服务器错误',
				data: null
			})
		})
})

// 文章列表接口
router.post('/getList', (req, res) => {
    console.log(req.body);
    let {skip, limit, tag} = req.body;
    let options = tag==='首页'?{}:{tag}
    // limit排除 -> 可以找到tags标签下总文章数量
    article.find(options, {__v:0}, {sort: {pv: -1}, skip, limit})
        .then((data) => {
            res.send({
                code: 0,
                msg: '请求成功',
                data
            })
        })
        .catch(()=>{
            res.send({
                code: 4,
                msg: '服务器出错',
                data: null
            })
        })
})

// tags下标签总数
router.post('/getNum', (req, res) => {
    let {tag} = req.body;
    // console.log(req.body, tag);
    let option = tag==='首页'?{}:{tag};
    // console.log(option);
    article.find(option, {_id:0,__v:0}, {sort: {pv: -1}, skip: 0})
        .then((data) => {
            res.send({
                code: 0,
                msg: '请求成功',
                data
            })
        })
        .catch(()=>{
            res.send({
                code: 4,
                msg: '服务器出错',
                data: null
            })
        })
})

// 搜索接口
router.post('/getSearch', (req, res) => {
    let {skip, limit, keyword} = req.body;
    console.log(skip, limit, keyword)
    if(!keyword){
        res.send({
            code: 1,
            msg: '请输入查询关键字',
            data: []
        });
        return
    }
    let reg = new RegExp(keyword, 'i');
    article.find(
        {$or: [{title: reg}, {tag: reg}]},
        {},
        {skip, limit, sort: {pv: -1}}
    ).then((data) => {
        res.send({
            code: 0,
            msg: '查询成功',
            data
        })
    }).catch(() => {
        res.send({
            code: 4,
            msg: '服务器错误',
            data: []
        })
    })
})

// 搜索接口下的总文章数量
router.post('/getSearchInfo', (req, res) => {
    let {keyword} = req.body;
    console.log(keyword)
    if(!keyword){
        res.send({
            code: 1,
            msg: '请输入查询关键字',
            data: []
        });
        return
    }
    let reg = new RegExp(keyword, 'i');
    article.find(
        {$or: [{title: reg}, {tag: reg}]},
        {_id: 1, title: 1},
        {sort: {pv: -1}}
    ).then((data) => {
        res.send({
            code: 0,
            msg: '查询成功',
            data
        })
    }).catch(() => {
        res.send({
            code: 4,
            msg: '服务器错误',
            data: []
        })
    })
})

// 获取文章内容
router.post('/', (req, res)=>{
    let {_id} = req.body;
    if(!_id){
        res.send({
            code: 1,
            msg: '文章id格式错误'
        })
        return
    }
    article.findById(_id).then(data => {
        if(data){
            // 更新浏览量
            article.updateOne({_id}, {$inc: {pv: 1}}).then(()=>{});
            res.send({
                code: 0,
                msg: '文章查询成功',
                data
            })
        }else{
            res.send({
                code: 2,
                msg: '文章不存在'
            })
        }
    }).catch(()=>{
        res.send({
            code: 4,
            msg: '服务器错误'
        })
    })
})

// 延伸阅读
router.post('/extend', (req, res)=>{
    let {tag} = req.body;
    if(!tag){
        res.send({
            code: 1,
            msg: '格式错误'
        })
        return
    }
    article.find({tag}, {_id: 1, title: 1}, {skip: 0, limit: 2, sort: {pv: -1}})
        .then(data => {
            if(data){
                res.send({
                    code: 0,
                    msg: '查询成功',
                    data
                })
            }else{
                res.send({
                    code: 2,
                    msg: 'tag不存在'
                })
            }
        }).catch(()=>{
            res.send({
                code: 4,
                msg: '服务器错误'
            })
        })
})

module.exports = router;