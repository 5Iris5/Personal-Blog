<template>
    <div id="layedit">
        <textarea id="layedit-input" style="display: none;"></textarea>
        <button type="button" class="layui-btn layui-btn-normal" @click="handleClick">提交留言</button>
    </div>
</template>

<script>
export default {
    name: 'Layedit',
    data(){
        return {
            layedit: null,
            index: 0
        }
    },
    methods: {
        handleClick(){
            // console.log(this.layedit.getContent(this.index))
            this.$emit('submitComment', this.layedit.getContent(this.index))
        }
    },
    mounted(){
        layui.use('layedit', ()=>{
        this.layedit = layui.layedit;
        //建立编辑器
        this.index = this.layedit.build('layedit-input', {
            height: 210,
            tool: ['face']
        }); 
        });
    }
}
</script>

<style lang="less" scoped>
#layedit{
    padding-top: 20px;
    .layui-btn{
        margin-top: 20px;
    }
}
</style>

<style>
.layui-layer{
    top: 404px!important;
    z-index: 900!important;
}
</style>