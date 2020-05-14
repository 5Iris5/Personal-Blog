<template>
    <div class="detail">
        <Nav></Nav>
        <article class="detail-main" v-if="articleInfo">
            <section class="detail-article">
                <h3 class="art-tit">{{articleInfo.title}}</h3>
                <div class="art-info">
                    <span class="author"><i class="iconfont icon-iconfont-user"></i>IrisLong</span>
                    <span class="time"><i class="iconfont icon-rili-copy"></i>{{articleInfo.date | getDate}}</span>
                    <span class="tag"><i class="iconfont icon-tag"></i>{{articleInfo.tag}}</span>
                    <span class="pv"><i class="iconfont icon-huo"></i>{{articleInfo.pv}}</span>
                    <span class="comment"><i class="iconfont icon-comment"></i>{{articleInfo.comment.length}}</span>
                </div>
                <div class="art-con" v-html="articleInfo.content">
                    <!-- <p>
                        由于平时比较忙，博客也好久没有更新了，一直说帮朋友做这个网站，一直没时间，之前用wordpress搭了一个站点，
                        由于服务器过期了，站点没了，加上那个站点也没有用过，就没有管，一直说重新做一个，刚好之前我用
                    </p>
                    <h4>主要技术</h4>
                    <p>
                        后台管理系统-前端：vuejs全家桶+element-ui
                    </p>
                    <h4>效果图</h4>
                    <p><img src="https://upyun.xuanmo.xin/3445/20200407221205760701.png" alt=""></p>
                    <p><img src="https://upyun.xuanmo.xin/3445/20200407221205727168.png" alt=""></p> -->
                </div>
            </section>
            <section class="detail-ref">
                <h4>延伸阅读</h4>
                <ol>
                    <li v-for="link in extendList" :key="link._id">
                        <router-link :to="'/detail/' + link._id">{{link.title}}</router-link>
                    </li>
                </ol>
            </section>
            <section class="detail-author">
                <img class="cover" src="http://localhost:3000/images/defaultSurface.jpg" alt="">
                <div class="right">
                    <p class="author-intr">前面的路可能很远，你可能会哭，但一定要走下去，一定不能停。</p>
                    <div class="author-summary">
                        <p>非特殊说明，本文版权归 <b>IrisLong</b> 所有，转载请注明出处。</p>
                        <p>本文标题：<a href="javascript:void(0)">{{articleInfo.title}}</a></p>
                        <p>本文网址：<a href="javascript:void(0)"></a></p>
                    </div>
                    <ul class="author-link">
                        
                    </ul>
                </div>
            </section>
            <!-- <section class="detail-comment">
                评论
            </section> -->
        </article>
        <Footer></Footer>
    </div>
</template>

<script>
import request from '@/api/index'
let getArticle = request.getArticle
let getArticleExtend = request.getArticleExtend
import Nav from '@/components/Nav'
import Aside from '@/components/Aside'
import Footer from '@/components/Footer'
export default {
    name: 'Detail',
    components: {
        Nav,
        Aside,
        Footer
    },
    data(){
        return {
            articleInfo: null,
            extendList: []
        }
    },
    filters: {
        getDate(val){
            // console.log(this, val)
            let valIdx = val.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})/)
            return `${valIdx[1]}/${valIdx[2]}/${valIdx[3]}/${valIdx[4]}:${valIdx[5]}:${valIdx[6]}`
        }
    },
    watch: {
        // 监视router变化，刷新页面，解决页面不跟新问题
        $route(to, from){
            // console.log(router.params.id)
            this.$router.go(0);
        }
    },
    created(){
        /*
        * 页面不更新问题 ->> 第二次进入页面仍旧是第一次进入的内容
        * 原因： keep-alive将状态保留在内存中，防止重复渲染DOM
        */ 
        // console.log(this.$route.params.id)
        getArticle(this.$route.params.id).then(res=>{
            // console.log(res)
            if(res.data.code === 0){
                this.articleInfo = res.data.data
                getArticleExtend(res.data.data.tag).then(res=>{
                    // console.log(res)
                    this.extendList = res.data.data
                })
            }else{
                this.$router.push('/404')
            }
        }).catch(()=>{
            console.log('获取文章内容接口出错')
        })
    }
}
</script>

<style lang="less" scoped>
.detail{
    padding-top: 80px;
    .detail-main{
        box-sizing: border-box;
        // width: 100%;
        max-width: 1200px;
        margin: 0 auto 20px;
        padding: 0 50px;
        .detail-article{
            padding: 20px;
            color: #2c3e50;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
            .art-tit{
                height: 30px;
                line-height: 30px;
                // padding-bottom: 10px;
                font-size: 18px;
                text-align: center;
            }
            .art-info{
                padding-bottom: 10px;
                border-bottom: 1px solid #eeee;
                color: orangered;
                font-size: 12px;
                text-align: center;
                span{
                        margin-right: 10px;
                        i{
                            padding-right: 3px;
                        }
                    }
            }
            .art-con{
                font-size: 14px;
                line-height: 1.8;
                p{
                    margin-top: 15px;
                    img{
                        display: block;
                        width: 100%;
                        box-shadow: 0 0 10px #d2d2d2;
                    }
                }
                h4{
                    margin: 20px auto 10px;
                    padding: 5px 0 5px 10px;
                    border-left: 5px solid #20a0ff;
                    background: #f0f2f7;
                    font-size: 16px;
                }
            }
        }
        .detail-ref{
            margin-top: 20px;
            padding: 20px;
            color: #2c3e50;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
            h4{
                margin-bottom: 10px;
                padding: 5px 0 5px 10px;
                border-left: 5px solid #20a0ff;
                background: #f0f2f7;
                font-size: 16px;
            }
            ol{
                li{
                    line-height: 1.5;
                    a{
                        color: #666;
                        font-size: 13px;
                        transition: all .3s;
                        &:hover{
                            color: #20a0ff;
                            text-decoration: underline;
                        }
                    }
                    &::before{
                        content: "◈";
                        margin-right: 5px;
                        color: #787977;
                    }
                }
            }
        }
        .detail-author{
            display: flex;
            margin-top: 20px;
            padding: 20px;
            color: #2c3e50;
            font-size: 14px;
            line-height: 1.8;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
            img{
                flex-shrink: 0;
                display: block;
                width: 100px;
                height: 100px;
                margin-right: 10px;
                border-radius: 3px;
            }
            .right{
                width: 100%;
                font-size: 13px;
                line-height: 1.5;
                .author-intr{
                    padding-bottom: 5px;
                    border-bottom: 1px solid #eeee;
                    color: #20a0ff;
                }
                .author-summary{
                    padding: 5px 0;
                    p{
                        b{
                            color: #20a0ff;
                        }
                        a{
                            color: #666;
                            cursor: pointer;
                            transition: all .3s;
                            &:hover{
                                color: #20a0ff;
                            }
                        }
                    }
                }
                .author-link{
                    display: flex;
                    li{
                        box-sizing: border-box;
                        width: 30px;
                        height: 30px;   
                        margin-right: 10px;
                        padding: 5px;
                        border-radius: 4px;
                        background: #f0f2f7;
                    }
                }
            }
        }
        .detail-comment{
            margin-top: 20px;
            padding: 20px;
            color: #2c3e50;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
        }
    }
}
</style>