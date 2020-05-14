// login路由下的二级路由
const express = require('express');
let router = express.Router();

// 关联user数据库
let userDate = require('../../db/user');
// 关联最近访客数据库
let visitorData = require('../../db/visitor');

// 登录接口
router.post('/', (req, res)=>{
    // 已经是登录状态了
    if(req.session.login){
        res.send({
            code: 3,
            msg: '已经登录，请退出后重新登录'
        })
        return;
    }

    let {user, pwd} = req.body;
	// 验证数据有效性   
	if(!user || !pwd){
		res.send({
			code: 1,
			msg: '数据无效,请检查后再注册'
		});
		return;
    }
    // 验证用户名是否符合规则
	if(!/^[\u4E00-\u9FA5a-zA-Z0-9_-]{3,9}$/.test(user)){
		res.send({
			code: 2,
			msg: '用户名不符合规则'
		});
		return;
    }
    // 验证密码是否符合规则
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(pwd)){
		res.send({
			code: 2,
			msg: '密码不符合规则'
		});
		return;
    }
    // 验证用户是否完成注册
    /* 
    * 不能用find!
    * coz 用户名是唯一的；find返回的是一个数组或者空数组，不方便取值
    * findOne 返回一个对象或者null
    */
    userDate.findOne({user})
        .then(data=>{
            // console.log(data)
            // console.log(data.pwd, pwd)
            if(data){
                if(data.pwd === pwd){
                    // 登录成功后写入session,记录该用户的登录状态
                    req.session.login = data;

                    // 发送给前端
                    res.send({
                        code: 0,
                        msg: '登录成功'
                    });

                    // 添加到最近访客列表
                    visitorData.deleteMany({user: data._id})
                        .then(()=>{
                            // console.log("id: " + data._id)
                            visitorData.create({
                                user: data._id
                            });
                        })
                        .catch((e)=>{
                            // console.log(e)
                        });
                        
                }else{
                    res.send({
                        code: 3,
                        msg: '密码错误'
                    })
                }
            }else{
                res.send({
                    code: 3,
                    msg: '用户不存在'
                })
            }
        })
        .catch(err=>{
            res.send({
                code: 4,
                msg: '服务器错误'
            })
        })
})

// 登录状态验证接口
router.post('/getLoginState', (req, res)=>{
    // 密码不能发送给前端
    // let data = req.session.loginInfo;
    // let resData = false;
    // if(data){
    //     delete data.pwd;
    //     delete data.__V;
    //     resData = data
    // }
    res.send({
        loginInfo: req.session.login
        // loginInfo: resData
    })
})

// 退出登录接口
router.post('/getLogout', (req, res)=>{
    req.session.destroy();
    res.send({
        code: 0,
        msg: '退出成功'
    })
})

module.exports = router;