// register路由下的二级路由
const express = require('express');
const svgCaptcha = require('svg-captcha');  // 验证码包
let router = express.Router();

// 关联user数据库表
let userDate = require('../../db/user');

/*
* 注册相关接口:
* 	1. 注册
* 	2. 验证码图片请求接口 安装svg-captcha依赖包
* 	3. 验证码输入失去焦点请求接口
* */

router.post('/', (req, res)=>{
	let {user, pwd, checkpwd, vcode} = req.body;
	// 验证数据有效性   
	if(!user || !pwd || !checkpwd || !vcode){
		res.send({
			code: 1,
			msg: '数据无效,请检查后再注册'
		});
		return;
	}
	// 验证svg
	if(vcode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase()){
		res.send({
			code: 2,
			msg: '验证码错误'
		});
		return;
	}
	// 验证用户是否符合规则
	if(!/^[\u4E00-\u9FA5a-zA-Z0-9_-]{3,9}$/.test(user)){
		res.send({
			code: 3,
			msg: '用户名不符合规则'
		});
		return;
    }
    // 验证密码是否符合规则
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(pwd)){
		res.send({
			code: 3,
			msg: '密码不符合规则'
		});
		return;
    }
    // 验证两次输入密码是否一致
    if(pwd !== checkpwd){
		res.send({
			code: 3,
			msg: '两次输入密码不一致'
		});
		return;
    }
	// 检测用户名是否重复
	userDate.findOne({user})
		.then((data)=>{
            // console.log(data)
			if(data){
				res.send({
					code: 3,
					msg: '用户名已存在'
				})
			}else{
				userDate.create({user, pwd})
					.then(data=>{
						res.send({
							code: 0,
							msg: '注册成功'
						})
					})
					.catch(err=>{
						res.send({
							code: 4,
							msg: '服务器错误'
						})
					})
			}
		})
		.catch((err)=>{
			res.send({
				code: 4,
				msg: '服务器错误'
			})
		})
})

router.post('/vcode', (req, res)=>{
	// 防止刷新请求过于频繁
	if(req.session.registerVCodeTime){
		let _t = new Date - new Date(req.session.registerVCodeTime)
		if(_t <= 5000){
			res.send({
				code: 2,
				msg: '请求过于频繁',
				data: req.session.registerVCode.data,
				time: (5000 - _t)/1000
			});
			return;
		}
	}
	
	let captcha = svgCaptcha.create();
	// 将正确答案存储到session里面
	// req.session.registerVCode = captcha.text;
	// 5s内关闭再打开注册框,确保里面有svg图片
	req.session.registerVCode = captcha;
	// 记录时间
    req.session.registerVCodeTime = new Date();
    
	// 将svg发送到前端
	res.send({
		code: 0,
		msg: '请求成功',
		data: captcha.data,
		time: 5000/1000
	})
})

router.post('/checkVCode', (req, res)=>{
	let {vcode} = req.body;
	if(!vcode || (vcode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase())){
		res.send({
			code: 1,
			msg: '验证失败'
		})
	}else{
		res.send({
			code: 0,
			msg: '验证成功'
		})
	}
})

module.exports = router;