<template>
    <div id="register">
        <el-dialog title="注册" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
                <el-form-item label="用户名" prop="user">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpwd">
                    <el-input v-model="form.checkpwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vcode" class="v-code">
                    <el-input v-model="form.vcode"></el-input>
                    <div class="svg-pic" v-html="svg.picture"></div>
                    <el-link @click="refreshSVG" :disabled="svg.disabled">{{svg.refreshTxt}}</el-link>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clickCancel">取消</el-button>
                <el-button type="success" @click="clickRegister('form')" :disabled="subDisabled">立即注册</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from '../api/index';
let getRegisterVCode = request.getRegisterVCode;
let getCheckVCode = request.getCheckVCode;
let postRegister = request.postRegister;
// console.log(postRegister)
export default {
    name: 'Register',
    props: ['dialogVisible'],
    data(){
        return {
            /* 表单数据 */
            form: {
                user: '',
                pwd: '',
                checkpwd: '',
                vcode: ''
            },
            /* 验证规则 */
            rules: {
                user: {
                    type: String,
                    required: true,
                    trigger: ['blur', 'change'],
                    validator: (rule, val, cb)=>{
                        if(val){
                            if(/^[\u4E00-\u9FA5a-zA-Z0-9_-]{3,9}$/.test(val)){
                                cb()
                            }else{
                                cb(new Error('3-9位 中英文、数字、下划线、减号'))
                            }
                        }else{
                            cb(new Error('请输入用户名'))
                        }
                    }
                },
                pwd: {
                    type: String,
                    required: true,
                    trigger: ['blur', 'change'],
                    validator: (rule, val, cb)=>{
                        if(val){
                            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(val)){
                                cb()
                            }else{
                                cb(new Error('8-16位，包含大小写字母和数字'))
                            }
                        }else{
                           cb(new Error('请输入密码')) 
                        };
                        // 触发确认密码的验证
                        this.form.checkpwd && this.$refs.form.validateField('checkpwd')
                    }
                },
                checkpwd: {
                    type: String,
                    required: true,
                    trigger: ['blur', 'change'],
                    validator: (rule, val, cb)=>{
                        if(val){
                            if(val !== this.form.pwd){
                                cb(new Error('两次密码输入不一致')) 
                            }else{
                                cb()
                            }
                        }else{
                            cb(new Error('请确认密码')) 
                        }
                    }
                },
                vcode: {
                    type: String,
                    required: true,
                    trigger: ['blur', 'change'],
                    validator: (rule, val, cb)=>{
                        if(val){
                            getCheckVCode(val).then((res)=>{
                                // console.log(res)
                                if(res.data.code === 0){
                                    cb()
                                }else{
                                    cb(new Error('验证码错误'))
                                }
                            }).catch((err)=>{
                                cb(new Error('未知错误...'))
                            })
                        }else{
                            cb(new Error('请输入验证码'))
                        }
                    }
                }
            },
            /* 验证码相关 */
            svg: {
                picture: '',
                refreshTxt: '',
                timer: null,
                // 按钮是否可点击 false->可点击 true->不可点击
				disabled: false
            },
            subDisabled: false
        }
    },
    methods: {
        getVCode(){
            getRegisterVCode().then(res=>{
                // console.log(res)
                clearInterval(this.svg.timer);
				let t = 0;
				let fn = () => {
                    t+=1;
					if(t > res.data.time) {
						clearInterval(this.svg.timer);
						this.svg.disabled = false;  
						this.svg.refreshTxt = "刷新";
					}else{
                        this.svg.disabled = true;
                        this.svg.refreshTxt = ((res.data.time - t)|0) + "s后可刷新";
					}
				}
				this.svg.timer = setInterval(fn, 1000);
				fn();
				// 更新图片
				this.svg.picture = res.data.data;
            }).catch(err=>{
                console.log('请求验证码图片出错...')
            })
        },
        refreshSVG(){
            this.getVCode()
        },
        /* 点击取消按钮 
        *   子组件向父组件发射handleClose事件
        *   通过传递的参数true/false判断点击的是取消按钮还是注册按钮
        * */
        clickCancel(){
            this.$emit('handleClose', false);
            this.$refs.form.resetFields();
        },
        /* 点击注册按钮*/
        clickRegister(form){
            this.subDisabled = true
            this.$refs[form].validate((valid) => {
				if (valid) {
					postRegister(this.form).then((res)=>{
                        // console.log(res)
						if(res.data.code){
							this.$message({
							    message: res.data.msg,
                                type: 'error',
                                duration: 1500
                            });
						}else{
							this.$message({
							    message: '注册成功,快来登录趴~',
                                type: 'success',
                                duration: 1500
                            });
                            setTimeout(()=>{
                                this.$emit('handleClose', true);
                                // 移除校验结果并重置字段值
                                this.$refs.form.resetFields();
                            },2000)
                        }
                        this.subDisabled = false;
					}).catch((err)=>{
                        this.subDisabled = false;
						console.log('注册请求出错...')
					})
				} else {
                    this.subDisabled = false;
					console.log('error submit!!');
					return false;
                }
            })
        }
    },
    created(){
        this.getVCode()
    },
    destroyed(){
        clearInterval(this.svg.timer);
    }
}
</script>

<style lang="less" scoped>
#register{
    /deep/.el-dialog__wrapper{
        .el-dialog{
            width: 25%!important;
            min-width: 350px!important;
            margin-top: 25vh!important;
            // .el-dialog__header{

            // }
            .el-dialog__body{
                .el-form{
                    /deep/.v-code{
                        display: flex;
                        .el-form-item__label{
                            width: 140px!important;
                        }
                        .el-form-item__content{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-left: 0!important;
                            .el-input{
                                width: 29%
                            }
                            .svg-pic{
                                width: 40%;
                                height: 40px;
                                svg{
                                    width: 100%!important;
                                    height: 100%!important;
                                }
                            }
                            .el-link{
                                width: 25%;
                                font-size: 12px;
                                &::after{
                                    width: 0;
                                }
                            }
                            .el-form-item__error{
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>