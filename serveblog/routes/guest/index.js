const express = require('express');
let router = express.Router();

const guestData = require('../../db/guest');

// 提交留言
router.post('/commitMsg', (req, res)=>{
    let {user, content} = req.body;

    // 验证数据
    if(!user || !content){
        res.send({
            code: 1,
            msg: '数据格式错误'
        })
        return
    }

    // 添加评论
    guestData.create({user, content})
        .then(data=>{
            res.send({
                code: 0,
                msg: '留言成功！'
            })
        })
        .catch(()=>{
            res.send({
                code: 4,
                msg: '服务器错误'
            })
        })
});

// 获取留言列表
router.post('/getMsgList', (req, res)=>{
    let {skip, limit} = req.body;
    // 第一个popluta关联用户表  第二个关联嵌套在对象内的children
    guestData.find({},{},{skip, limit, sort: {date: -1}})
        .populate('user', {_id: 1, user: 1, photo: 1})
        .populate('children.user', {_id: 1, user: 1, photo: 1})
        .then(data=>{
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
                data: []
            })
        })
})

// 留言列表内的回复接口
router.post('/commitChildMsg', (req, res)=>{
    let {parentID, user, content, replyuser} = req.body;

    // 验证数据
    if(!parentID || !user || !content || !replyuser){
        res.send({
            code: 1,
            msg: '数据格式错误'
        })
        return
    }

    // 查找父留言数据
    guestData.findById(parentID)
        .then(data=>{
            if(data){  // 父留言存在
                guestData.updateOne({_id: parentID}, {$push: {'children': {user, content, replyuser}}})
                    .then(d=>{
                        res.send({
                            code: 0,
                            msg: '回复成功'
                        })
                    })
            }else{
                res.send({
                    code: 2,
                    msg: '该条留言已删除!'
                })
            }
        })
        .catch(()=>{
            res.send({
                code: 4,
                msg: '服务器错误'
            })
        })
})

module.exports = router;