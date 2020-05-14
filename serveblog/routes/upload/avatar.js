const express = require('express');
const multer  = require('multer');
const path = require('path');
const userData = require('../../db/user');

let router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/upload/avatar'))
    },
    filename: function (req, file, cb) {
        // console.log(file)
        let fileName = '';
        if(req.session.login){
            fileName = req.session.login._id + file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)[0]
        }else{
            fileName = file.fieldname + '-' + Date.now() + file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)[0]
        }
        cb(null, fileName)
    }
  })
   
let upload = multer({ storage }).single('file');
 

router.post('/', (req, res)=>{
    upload(req, res, function(err){
        console.log(req.file)

        if(err instanceof multer.MulterError){
            console.log(1)
            res.sendStatus(500);
        }else if(err){
            console.log(2)
            res.sendStatus(500);
        }else{
            // 更新用户表
            if(!req.session.login){
                console.log(3)
                res.sendStatus(500);
                return;
            }
            console.log('将头像地址添加到数据库：' + req.file.filename)
            userData.updateOne(
                {_id: req.session.login._id},
                {photo: "http://localhost:3000/images/upload/avatar/" + req.file.filename}
            ).then(()=>{
                // 重新更新session
                console.log('重置session...'),
                req.session.login.photo = "http://localhost:3000/images/upload/avatar/" + req.file.filename,
                console.log("重置" + req.file.fieldname)
                res.send('okay')
            }).catch((e)=>{
                console.log(e),
                res.sendStatus(500)
            })
        }
    })
})

module.exports = router;