<template>
    <div id="login">
        <el-dialog title="登录" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
                <el-form-item label="用户名" prop="user">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clickCancel">取消</el-button>
                <el-button type="primary" @click="clickLogin('form')" :disabled="subDisabled">登录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from '../api/index';
let postLogin = request.postLogin;
// console.log(postLogin)
export default {
    name: 'Login',
    props: ['dialogVisible'],
    data(){
        return {
            form: {
                user: '',
                pwd: ''
            },
            rules: {
                user: {
                    type: String,
                    required: true,
                    trigger: ['blur', 'change'],
                    validator: (rule, val, cb)=>{
                        if(val){
                            // 
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
                        }
                    } 
                }
            },
            subDisabled: false
        }
    },
    methods: {
        clickCancel(){
            this.$emit('handleClose', false);
            this.$refs.form.resetFields();
        },
        clickLogin(form){
            this.subDisabled = true
            this.$refs[form].validate((valid) => {
				if (valid) {
					postLogin(this.form).then((res)=>{
                        // console.log(res)
						if(res.data.code){
							this.$message({
							    message: res.data.msg,
                                type: 'error',
                                duration: 1500
                            });
                            this.subDisabled = false;
						}else{
							this.$message({
							    message: '登录成功',
                                type: 'success',
                                duration: 1500
                            });
                            setTimeout(()=>{
                                this.$emit('handleClose', true);
                                // 移除校验结果并重置字段值
                                this.$refs.form.resetFields();
                            },2000)
                            // 刷新页面 -> 避免img标签路径出错
                            window.location.reload();
                            this.subDisabled = true;
                        }
					}).catch((err)=>{
                        this.subDisabled = false;
						console.log('登录请求出错...')
					})
				} else {
                    this.subDisabled = false;
					console.log('error submit!!');
					return false;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
#login{
    /deep/.el-dialog__wrapper{
        .el-dialog{
            width: 25%!important;
            min-width: 350px!important;
            margin-top: 25vh!important;
        }
    }
}
</style>