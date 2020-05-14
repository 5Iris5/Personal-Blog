<template>
    <div id="login">
        <!-- :show-close="false" -->
        <el-dialog title="上传头像" :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="clickCancel">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/upload/avatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :with-credentials="true">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Avator',
    props: ['dialogVisible'],
    data(){
        return {
            imageUrl: ''
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(file)
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$message({
                message: '头像修改成功',
                type: 'success',
                duration: 1500
            });
            setTimeout(()=>{
                this.$emit('handleClose'),
                window.location.reload();
            },2000);
            
        },
        beforeAvatarUpload(file) {
            console.log('日了狗了，一直卡死浏览器')
            const isJPG = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
            const isLt200k = file.size / 1024  < 200;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
            }
            if (!isLt200k) {
            this.$message.error('上传头像图片大小不能超过 200k!');
            }
            return isJPG && isLt200k; 
        },
        clickCancel(){
            this.$emit('handleClose');
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
            .el-dialog__body{
                padding: 10px 20px 20px;
                .avatar-uploader{
                    .el-upload {
                        border: 1px dashed #d9d9d9;
                        border-radius: 6px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                        &:hover {
                            border-color: #409EFF;
                        }
                        .avatar {
                            width: 178px;
                            height: 178px;
                            display: block;
                        }
                        .avatar-uploader-icon {
                            font-size: 28px;
                            color: #8c939d;
                            width: 178px;
                            height: 178px;
                            line-height: 178px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>