<template>
  <!-- 末尾版权区 -->
    <footer id="footer">
        <div class="wrap">
            <div class="copyright">版权所有 © 2020 - 02 - 29 | IrisLong All Rights Reserved</div>
        </div>
        <el-backtop :right="65" :bottom="65">
            <i class="iconfont icon-fanhuidingbu"></i>
        </el-backtop>
        <!-- <div class="backtop"><i class="iconfont icon-fanhuidingbu"></i></div> -->
    </footer>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Footer'
}
</script>

<style lang="less" scoped>
#footer{
    width: 100%;
    padding: 30px 0;
    background-color: #e1e5eb;
    border-top: 1px solid #d3d8e0;
    box-shadow: 0 1px rgba(255,255,255,.5) inset;
    /* box-shadow: 0 1px #d8e0ea, 0 0 transparent, 0 2px rgba(255,255,255,1); */
    color: #738192;
    font-size: 14px;
    text-align: center;
    /deep/.el-backtop{
        position: fixed;
        bottom: 60px;
        right: 60px;
        z-index: 99;
        width: 34px;
        height: 34px;
        line-height: 34px;
        border: 1px solid rgba(0,40,83,.2);
        border-radius: 7px;
        text-align: center;
        color: #8b9bb0;
        background: linear-gradient(#fff,#f0f2f4);
        box-shadow: 0 2px 2px rgba(31,45,62,.1), 0 0 0 1px #fff inset;
        transition: .3s;
        i{
            display: inline-block;
            margin-top: -13px;
        }
        &:hover{
            color: #fff;
            border: 1px solid #20a0ff;
            background-color: #20a0ff;
            box-shadow: 0 3px 3px rgba(32,160,255,.35), 0 0 3px 16px rgba(32,160,255,1) inset;
        }
    }
}
</style>