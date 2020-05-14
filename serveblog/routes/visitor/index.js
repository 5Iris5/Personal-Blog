const express = require('express');
let router = express.Router();

const visitorData = require('../../db/visitor');

router.post('/', (req, res)=>{
    visitorData.find({}, {}, {skip: 0, limit: 12, sort: {date: -1}})
        .populate('user', {_id: 1, user: 1, photo: 1})
        .then(data=>{
            // console.log(data)
            res.send({
                code: 0,
                msg: '请求成功',
                data
            })
        })
        .catch(()=>{
            res.send({
                code: 0,
                msg: '服务器错误',
                data: []
            })
        })
})

module.exports = router;