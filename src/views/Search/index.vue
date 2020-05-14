<template>
    <div class="search">
      <Nav></Nav>
      <div id="container">
        <div class="container-main">
          <el-container>
            <el-main>
              <div id="article">
                <h3 class="art-tit">
                    共<span style="color:#20a0ff">{{articleNum}}</span>条关于“<span style="color:#20a0ff">{{keyword}}</span>”的文章
                </h3>
                <section class="art-list" v-for="(item,index) in articleList" :key="index">
                    <router-link :to="'/detail/' + item._id" class="sec-tit">
                        <img :src="item.surface" alt="">
                    </router-link>
                    <div class="sec-content">
                        <h3 class="title">
                            <span>【{{item.type}}】</span>
                            <router-link :to="'/detail/' + item._id">{{item.title}}</router-link>
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
                        </div>
                    </div>
                </section>
                <div class="not" v-show="isNot">没有对应词条信息！</div>
                <router-link tag="div" class="page-router" :to="'/search/' + currentPage + '?keywords=' + keyword">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="8"
                        layout="prev, pager, next, jumper"
                        :total="Math.ceil(articleNum)">
                    </el-pagination>
                </router-link>
            </div>
            </el-main>
            <el-aside style="width: 280px;">
              <Aside></Aside>
            </el-aside>
          </el-container>
        </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import request from '../../api/index'
let getArticleSearch = request.getArticleSearch;
let getSearchInfo = request.getSearchInfo;
// console.log(getArticleSearch)
import Nav from '@/components/Nav'
import Aside from '@/components/Aside'
import Footer from '@/components/Footer'
import Bus from '../../assets/js/eventbus';
export default {
    name: 'Search',
    data(){
        return {
            articleList: '',
            articleNum: '',
            currentPage: 1,
            keyword: '',
            isNot: false
        }
    },
    components: {
        Nav,
        Aside,
        Footer
    },
    methods: {
        getSearchDate(){
            getArticleSearch(this.currentPage, this.$route.query.keywords, false).then(res=>{
                this.keyword = this.$route.query.keywords; // 避免第一次进来为""
                this.articleList = res.data.data;
                // console.log(res.data.data, res.data.data.length);
            }).catch(err=>{
                console.log('搜索接口请求出错...')
            })
        },
        getSearchNum(){
            getSearchInfo(this.$route.query.keywords).then(res=>{
                this.keyword = this.$route.query.keywords; // 避免第一次进来为""
                this.articleNum = res.data.data.length;
                // console.log(res.data.data, this.articleNum);
                if(this.articleNum === 0){
                    this.isNot = true
                }else{
                    this.isNot = false
                }
            }).catch(err=>{
                console.log('搜索文章条数接口请求出错...')
            })
        },
        handleCurrentChange(){
            document.documentElement.scrollTop = 0;
            this.$route.params.id = this.currentPage;
            getArticleSearch(this.currentPage, this.$route.query.keywords, true).then(res=>{
                this.keyword = this.$route.query.keywords; // 避免第一次进来为""
                this.articleList = res.data.data;
            }).catch(err=>{
                console.log('搜索数据请求出错...')
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
    created(){
        this.currentPage = this.$route.params.id*1;
        // 监听组件nav里面$emit()发送过来的数据kw
		Bus.$on("getkw", (kw)=>{
            /*
            * 问题一：成功返回数值，但是页面无法渲染！
            * 原因： Bus.$on(),第二个参数function,如果不是监听函数，内部this指向有问题
            * 问题二：刷新页面，数据消失
            * 解决：解决了第三个问题，第二个也随之解决了
            * 问题三：页面刷新后，从其他路由，第一次进入，无法获取到后台数据
            * 解决：根据路由参数取值，因为路由参数就是关键词
            */ 
			console.log('接受组件nav传递过来的数据：' + kw);
            this.keyword = kw;
            console.log("keyword: " + this.keyword);
            this.getSearchNum();
            this.getSearchDate();
            this.currentPage = 1;
        })
    },
    mounted(){
        document.documentElement.scrollTop = 0;
        // 第一次进入页面
        this.getSearchNum();
        this.getSearchDate();
        this.handleCurrentChange();
        // 获取路由参数
        console.log("路由参数：" + this.$route.query.keywords)
    }
}
</script>

<style lang="less" scoped>
#container{
    padding-top: 80px;
    >.container-main{
        box-sizing: border-box;
        // width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 50px;
        >.el-container{
            .el-main{
                width: 800px;
                padding: 0;
                margin-right: 20px;
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
                                max-height: 65px;
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
            }
            .el-aside{
                width: 280px;
                // background-color: #fcf;     
            }
        }
    }
}
</style>