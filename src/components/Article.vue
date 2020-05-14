<template>
  <div id="article">
    <h3 class="art-tit">文章列表栏目：{{tag}}</h3>
    <section class="art-list" v-for="(item, index) in articleList" :key="index">
        <router-link :to="'/detail/' + item._id" class="sec-tit">
            <img :src="item.surface" alt="">
        </router-link>
        <!-- <a href="" class="sec-tit">
            <img :src="item.surface" alt="">
        </a> -->
        <div class="sec-content">
            <h3 class="title">
                <span>【{{item.type}}】</span>
                <router-link :to="'/detail/' + item._id">{{item.title}}</router-link>
                <!-- <a href="">{{item.title}}</a> -->
            </h3>
            <p class="summary">
                {{item.content | getContent}}
            </p>
            <div class="opeartion">
                <div class="information">
                    <span class="tag"><i class="iconfont icon-tag"></i>{{item.tag}}</span>
                    <span class="time"><i class="iconfont icon-rili-copy"></i>{{item.date | getDate}}</span>
                    <span class="pv"><i class="iconfont icon-huo"></i>{{item.pv}}</span>
                    <span class="comment"><i class="iconfont icon-comment"></i>{{item.comment.length}}</span>
                </div>
                <router-link :to="'/detail/' + item._id" class="read-detail">阅读详情</router-link>
                <!-- <a href="" class="read-detail">阅读详情</a> -->
            </div>
        </div>
    </section>
    <div class="not" v-show="isNot">暂时没有数据辣！</div>
    <!-- <div class="page-router"> -->
    <router-link tag="div" class="page-router" :to="'/category/' + currentPage + '?tag=' + tag">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="8"
            layout="prev, pager, next, jumper"
            :total="Math.ceil(articleNum.length)">
        </el-pagination>
    </router-link>
    <!-- </div> -->
  </div>
</template>

<script>
import request from '../api/index'
let getArticleList = request.getArticleList
let getArticleNum = request.getArticleNum
// console.log(getArticleNum)
// 页面开启监控eventbus  ->   再页码那里加个router-link就可了！太傻了！
// import Bus from '../assets/js/eventbus';
export default {
    name: 'Article',
    data(){
        return {
            articleList: '',
            isNot: false,
            currentPage: 1,
            articleNum: '',
        }
    },
    methods: {
        // 路由参数变化 ->  页面重新渲染,数据从0开始加载(默认false)
        getRefresh(){
            // this.currentPage = this.$route.params.id*1
            // console.log("路由ID：" + this.$route.params.id)
            getArticleList(this.currentPage, this.tag, false).then((res) => {
                // console.log(res);
                this.articleList = res.data.data;
                // console.log("getRefresh页码：" + this.currentPage,"tag标签：" + this.tag, "tag标签下文章总数" + this.articleList.length);
                if(this.articleList.length === 0){
                    this.isNot = true
                }else{
                    this.isNot = false
                }
            }).catch(()=>{
                console.log('文章列表接口：请求发送失败...')
            })
        },
        // currentPage 改变时会触发  ->  页码数改变触发，跳过n条数据(true)
        handleCurrentChange(){
            document.documentElement.scrollTop = 0;
            // console.log("第几页? " + this.currentPage)
            // 当前页码 赋值给 路由id
            this.$route.params.id = this.currentPage.toString();
            // 发送消息给兄弟组件nav/aside
            // Bus.$emit("changeID", this.currentPage)
            // console.log("路由ID：" + this.$route.params.id)
            // 重新刷新渲染页面数据 -> 同步跟新动态路由id 根据页码跳数据加载(true)
            getArticleList(this.currentPage, this.tag, true).then((res) => {
                this.articleList = res.data.data;
                // console.log("handleCurrentChange页码：" + this.currentPage,"tag标签：" + this.tag, "tag标签下文章总数" + this.articleList.length);
                if(this.articleList.length === 0){
                    this.isNot = true
                }else{
                    this.isNot = false
                }
            }).catch(()=>{
                console.log('文章列表分页接口：请求发送失败...')
            })
        },
        // tags标签下的文章总数
        getNum(){
            getArticleNum(this.tag).then((res)=>{
                this.articleNum = res.data.data;
                console.log("文章总数：", this.articleNum.length)
            }).catch(()=>{
                console.log('tag标签文章总数接口：请求发送失败...')
            })
        }
    },
    filters: {
        getDate(val){
            // console.log(this, val)
            let valIdx = val.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})/)
            return `${valIdx[1]}-${valIdx[2]}-${valIdx[3]} ${valIdx[4]}:${valIdx[5]}:${valIdx[6]}`
        },
        getContent(val){
            var div = document.createElement('div')
            div.innerHTML = val
            return div.innerText
        }
    },
    computed: {
        // 路由id
        id(){
            return this.$route.params.id
        },
        // 路由字段传参
        tag(){
            // console.log(this.$route.params, this.$route.query)
            // var reg = /^[this.$route.query.tag]/i
            // console.log(reg)
            return this.$route.query.tag || '首页'
        }
    },
    created(){  
        // 高亮与路由同步，必须写在create生命周期里面,写在mounted里面无效，mounted已经完成页面渲染了
        this.currentPage = this.$route.params.id*1
    },
    watch: {
        /*
        * 监听路由参数变化 
        *   1. 动态路由 id参数改变 ->  根据页码值重新渲染id（根据跳8*id-1条数据）
        *   2. 字段路由 tag参数改变  ->  根据tag值重新渲染页面（数据从第0条开始渲染）
        * */
        id(){ 
            // console.log('watch路由ID：' + this.$route.params.id, "watch页码ID：" + this.currentPage)
            // this.$route.params.id = this.currentPage.toString()
            // console.log("id: " + this.$route.params.id, "tag: " + this.tag)
            // id -> undefined/NaN
            if(!this.$route.params.id && this.tag === '首页'){
                if(!this.$route.params.id){
                    this.currentPage = this.$route.params.id  = 1
                    // console.log("页码： " + this.currentPage)
                }
            }
            this.currentPage = this.$route.params.id*1
            this.handleCurrentChange();
        },
        tag(){
            // 回到顶部 无效？
            document.documentElement.scrollTop = 0;
            // console.log(document.documentElement.scrollTop);
            // 标签改变后，根据tag重新获取tag标签下文章总数
            this.getNum(); 
            // 标签改变后，重新渲染文章列表
            this.getRefresh();
            /* 问题：通过tag渲染页面后，页码保持上一次的数值
            *  要求：如果tag变化了，那么页码需要重新从1开始
            *  解决：强制 this.currentPage = 1
            * */
            // this.handleCurrentChange();
            this.currentPage = 1;
        }
        /*
        * 遗留问题
        * 第一次从首页切换页码时，数据/路由正确，但是高亮恒为1，与路由不统一，需手动刷新才可
        * 首页操作页码后，重新点击首页导航，页码与页面数字仍停留在上一次操作记录
        * 已解决 见id()
        * */ 
    },
    mounted(){
        this.getNum();
        // console.log('mounted路由ID：' + this.$route.params.id, "mounted页码ID：" + this.currentPage)
        this.getRefresh();
        // console.log('mounted路由ID2：' + this.$route.params.id, "mounted页码ID2：" + this.currentPage)
        this.handleCurrentChange();
        /* 
        * 遗留问题：当前页码刷新时 
        * 路由id 与 实际页码 是匹配的 
        * 但与页码高亮不匹配 页码高亮永远是1
        * */
    //    this.currentPage = this.$route.params.id*1
    }
}
</script>

<style scoped lang="less">
#article{
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
    h3.art-tit{
        height: 30px;
        line-height: 30px;
        padding-bottom: 5px;
        border-bottom: 1px solid #eeee;
        color: #2c3e50;
        font-size: 16px;
    }
    section.art-list{
        display: flex;
        border-bottom: 1px solid #eeee;
        .sec-tit{
                position: relative;
                width: 240px;
                padding: 15px 0;
                overflow: hidden;
            img{
                display: block;
                width: 100%;
                height: 145px;
                border-radius: 4px;
            }
            &::after{
                position: absolute;
                left: -100%;
                top: 0;
                z-index: 2;
                content: "";
                height: 100%;
                width: 100px;
                transform: skewX(-25deg) translateZ(0);
                background: linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.3) 50%,hsla(0,0%,100%,0));
            }
            &:hover{
                &::after{
                    transition: left .35s ease-in-out;
                    left: 100%;
                }
            }
        }
        .sec-content{
            width: 510px;
            margin-left: 15px;
            padding: 15px 0;
            .title{
                span{
                    padding-right: 5px;
                    color: #20a0ff;
                    font-size: 16px;
                }
                a{
                    font-size: 16px;
                    color: #333;
                }
            }
            .summary{
                // 字体大小*行高*行数
                max-height: 63px;
                color: #666;
                font-size: 14px;
                line-height: 1.5;
                // 多行文本超出省略号展示
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                margin: 15px 0;
            }
            .opeartion{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                width: 100%;
                font-size: 12px;
                color: orangered;
                .information{
                    padding: 6px 0;
                    span{
                        margin-right: 10px;
                        i{
                            font-size: 12px;
                            padding-right: 3px;
                        }
                    }
                }
                a.read-detail{
                    padding: 5px 10px;
                    background: linear-gradient(90deg, #20a0ff, #20b8ff);
                    border-radius: 4px;
                    color: #fff;
                }
            }
       
       }
    }
    >.not{
        margin: 15px 0;
        text-align: center;
        color: #20a0ff;
    }
    >.page-router{
        margin-top: 30px;
        text-align: center;
        a{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
</style>