<template>
    <div class="guest">
        <Nav></Nav>
        <!-- 留言页 -->
        <div class="guest-main">
            <!-- 标题 -->
            <div class="g-m-tit">
                <h2>让我看看，是哪个小可爱偷偷来我博客了~</h2>
            </div>
            <!-- 发表评论 -->
            <div class="g-m-post">
                <h3 class="post-tit">在这里留下你的足迹吧...</h3>
                <!-- <div class="post-input">
                    <div class="input-icon"><i class="iconfont icon-biaoqing"></i></div>
                    <textarea type="text" class="input-txt"></textarea>
                </div>
                <button class="post-submit" name="submit"><i class="iconfont icon-planefill"></i>提交留言</button> -->
                <Layedit @submitComment="handleSubmit"></Layedit>
            </div>
            <!-- 留言列表 -->
            <div class="g-m-comments">
                <ul class="visitors">
                    <li class="visitor-com" v-for="(item, index) in commentList" :key="index">
                        <div class="com-parent">
                            <img class="cover" :src="item.user.photo" />
                            <div class="right">
                                <span class="username">{{item.user.user}}</span>
                                <div class="reply-content" v-html="item.content"></div>
                                <div class="info">
                                    <span>{{item.date | getDate}}</span>
                                    <a href="javascript:void(0)" class="btn-reply" @click="handleReply(index)">
                                        {{item.reply.indexArr[0] === index && item.reply.indexArr[1] === undefined ? '收起' : '回复'}}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="com-child" v-for="(child, cIndex) in item.children" :key="cIndex">
                            <img class="cover" :src="child.user.photo" />
                            <div class="right">
                                <div class="reply-comment">
                                    <span class="username">{{child.user.user}}</span>
                                    <span>回复</span>
                                    <span class="username">{{child.replyuser}}</span>
                                    <span class="reply-content">{{child.content}}</span>
                                </div>
                                <div class="info">
                                    <span>{{child.date | getDate}}</span>
                                    <a href="javascript:void(0)" class="btn-reply" @click="handleReply(index, cIndex)">
                                        {{item.reply.indexArr[0] === index && item.reply.indexArr[1] === cIndex ? '收起' : '回复'}}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div :class="['reply-input', {'show': item.reply.ifShow}]">
                            <textarea v-model="item.reply.content" :placeholder="'回复【' + item.reply.replyuser + '】'"></textarea>
                            <button type="button" class="layui-btn layui-btn-normal layui-btn-sm" @click="handleChildCommit(index)">回复</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import request from '../../api';
let getLoginState = request.getLoginState;
let postMessage = request.postMessage;
let getMessageList = request.getMessageList;
let postChildMessage = request.postChildMessage;
import Nav from '@/components/Nav';
import Layedit from '@/components/Layedit';
import Footer from '@/components/Footer';
export default {
    name: 'Guest',
    components: {
        Nav,
        Layedit,
        Footer
    },
    data(){
        return {
            commentList: [
                /*{
                    reply: {
                        user: '',
                        content: '',
                        replyuser: '',
                        date: '',
                        ifShow: false,
                        indexArr: []
                    },
                    _id: '11',
                    user: {
                        _id: '',
                        user: '七七',
                        photo: 'http://localhost:3000/images/defaultSurface.jpg'
                    },
                    content: '<p>富文本内容</p>',
                    date: new Date() + '',
                    children: [
                        {
                            user: {
                                _id: '22',
                                user: '可乐加冰',
                                photo: 'http://localhost:3000/images/defaultSurface.jpg'
                            },
                            content: '回复内容',
                            date: new Date() + '',
                            replyuser: '七七'
                        },
                        {
                            user: {
                                _id: '33',
                                user: '嘻嘻',
                                photo: 'http://localhost:3000/images/defaultSurface.jpg'
                            },
                            content: '回复内容',
                            date: new Date() + '',
                            replyuser: '可乐加冰'
                        }
                    ]
                }*/
            ],
            skip: 0,
            limit: 0,
            ifLoading: false
        }
    },
    filters: {
        getDate(val){
            let date = new Date(val)
            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    },
    methods: {
        handleSubmit(val){
            // console.log(val)
            getLoginState().then(res=>{
                // 用户为已登录状态时 ->  执行留言提交的ajax
                if(res.data.loginInfo){
                    postMessage({
                        user: res.data.loginInfo._id,
                        content: val
                    }).then(res=>{
                         //    console.log(res)
                        if(res.data.code === 0){
                            layer.msg('留言成功', {
                                icon: 1,
                                time: 1500
                            })
                            setTimeout(()=>{
                                window.location.reload()
                            }, 1700)
                        }else{
                            layer.msg(res.data.msg, {
                                icon: 2,
                                time: 1500
                            }) 
                        }
                    })
                }else{
                    layer.msg('请先登录', {
                        icon: 2,
                        time: 1500
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    }, 1700)
                }
            }).catch(err=>{
                console.log('服务器错误，请稍后再试')
            })
        },
        handleReply(pIndex, cIndex){
            // console.log(this.commentList[pIndex].reply.ifShow)
            // console.log(pIndex, cIndex)
            if(pIndex === undefined) return

            let cParent = this.commentList[pIndex]
            // 判断连续两次是否点击的同一个
            if(pIndex === cParent.reply.indexArr[0] && cIndex === cParent.reply.indexArr[1]){
                cParent.reply.ifShow = false
                cParent.reply.indexArr = []
            }else{
                cParent.reply.ifShow = true
                cParent.reply.indexArr = [pIndex, cIndex]
            }
            // console.log(cParent.reply.indexArr)

            // 改变placeholder里面的用户名
            if(cIndex === undefined){ // 点击父级回复
                cParent.reply.replyuser = cParent.user.user
            }else{  // 点击子级回复
                cParent.reply.replyuser = cParent.children[cIndex].user.user
            }
        },
        handleChildCommit(pIndex){ 
            getLoginState().then(res=>{
                // 判断登录状态 ->  执行回复留言的ajax
                if(res.data.loginInfo){
                    postChildMessage({
                        parentID: this.commentList[pIndex]._id,
                        user: res.data.loginInfo._id,
                        content: this.commentList[pIndex].reply.content,
                        replyuser: this.commentList[pIndex].reply.replyuser
                    }).then(res=>{
                        // console.log(res)
                        if(res.data.code === 0){
                            layer.msg('回复成功', {
                                icon: 1,
                                time: 1500
                            })
                            setTimeout(()=>{
                                window.location.reload()
                            }, 1700)
                        }else{
                            layer.msg(res.data.msg, {
                                icon: 2,
                                time: 1500
                            })
                        }
                    }) 
                }else{
                    layer.msg('请先登录', {
                        icon: 2,
                        time: 1500
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    }, 1700)
                }
            }).catch(err=>{
                console.log('服务器错误，请稍后再试')
            })
        },
        addMessageList(){
            // 如果加载条数 > 总条数 那么 停止调用接口
            if(this.limit > this.commentList.length){
                this.ifLoading = true;
            }
            this.limit += 5;
            getMessageList(this.skip, this.limit).then(res=>{
                // console.log(res)
                console.log(this.limit, this.commentList.length)
                if(res.data.code === 0){
                    let data = res.data.data;
                    this.commentList = data.map(item=>{
                        item.reply = {
                            user: '',
                            content: '',
                            replyuser: '',
                            date: '',
                            ifShow: false,
                            indexArr: []
                        }
                        return item
                    })
                }
            }).catch(()=>{
                console.log('留言列表接口出错')
            })
        },
        // 函数节流(定时器) -> 限制一个函数在一定时间内只能执行一次
        throttle(fn,wait){
            var timer = null;
            return function(){
                var context = this;
                var args = arguments;
                if(!timer){
                    timer = setTimeout(function(){
                        fn.apply(context,args);
                        timer = null;
                    },wait)
                }
            }
        },
        // 滚动事件
        handleScroll(){
            if(this.ifLoading) return;

            // 文档高
            let d = document.documentElement.offsetHeight;
            // 滚动高
            let s = document.documentElement.scrollTop;
            // 可视区域高度
            let v = document.documentElement.clientHeight;

            if(v + s >= d-200){
                this.addMessageList()
            }
        }
    },
    mounted(){
        // 第一次发送请求
        this.addMessageList()

        // 监听滚轮事件
        window.addEventListener('scroll', this.throttle(this.handleScroll, 500))
    },
    destroyed(){
        window.removeEventListener('scroll', this.throttle(this.handleScroll, 500))
    }
}
</script>

<style lang="less" scoped>
.guest{
    padding-top: 80px;
    >.guest-main{
        box-sizing: border-box;
        // width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 50px;
        >.g-m-tit{
            box-shadow: 0 13px 15px rgba(31,45,61,.1);
            border-radius: 8px;
            background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584555098571&di=125c0e901eb2fc83859d264ebdb9ee78&imgtype=0&src=http%3A%2F%2Fupcdn.mpres.51vv.com%2Fvblock%2F08063b87b937ac7151125c86ba261d89.jpg);
            background-size: cover;
            background-position: right 12%;
            >h2{
                padding: 80px 0;
                font-size: 16px;
                color: #fff;
                text-align: center;
            }
        }
        >.g-m-post{
            padding: 20px;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 13px 15px rgba(31,45,61,.1);
            border-radius: 8px;
            .post-tit{
                font-size: 0;
                height: 35px;
                background: url('../../assets/images/guest.png') no-repeat center;
            }
            /*
            .post-input{
                height: 253px;
                margin: 15px 0;
                border: 1px solid #e6e6e6;
                .input-icon{
                    height: 54px;
                    line-height: 54px;
                    border-bottom: 1px solid #e6e6e6;
                    i{
                        font-size: 28px;
                        color: #777;
                        cursor: pointer;
                        margin-left: 10px;
                    }
                }
                .input-txt{
                    box-sizing: border-box;
                    width: 100%;
                    height: 200px;
                    padding: 10px;
                    line-height: 1.5;
                }
            }
            .post-submit{
                padding: 7px 10px;
                border-radius: 3px;
                color: #fff;
                background: linear-gradient(90deg,#20a0ff,#20b8ff);
                box-shadow: 0 3px 5px rgba(32,160,255,.5);
                i{
                    font-size: 20px;
                    vertical-align: middle;
                }
            }*/
        }
        >.g-m-comments{
            margin: 0 auto 20px;
            background-color: #fff;
            box-shadow: 0 13px 15px rgba(31,45,61,.1);
            border-radius: 8px;
            .visitors{
                .visitor-com{
                    font-size: 13px;
                    color: #2c3e50;
                    line-height: 1.5;
                    padding: 20px 20px 10px;
                    border-bottom: 1px dotted #e6e6e6;
                    .com-parent{
                        display: flex;
                        padding-bottom: 10px;
                        .cover{
                            flex-shrink: 0;
                            display: block;
                            width: 45px;
                            height: 45px;
                            margin-right: 10px;
                            border-radius: 3px;
                        }
                        .right{
                            width: 100%;
                            .username{
                                color: orangered;
                            }
                            .reply-content{

                            }
                            .info{
                                font-size: 12px;
                                .btn-reply{
                                    color: #20a0ff;
                                    padding-left: 8px;
                                }
                            }
                        }
                    }
                    .com-child{
                        display: flex;
                        padding: 10px 0;
                        margin-left: 55px;
                        border-top: 1px dotted #e6e6e6;
                        .cover{
                            flex-shrink: 0;
                            display: block;
                            width: 45px;
                            height: 45px;
                            margin-right: 10px;
                            border-radius: 3px;
                        }
                        .right{
                            .reply-comment{
                                .username{
                                    color: orangered;
                                }
                                .reply-content{
                                    padding-left: 5px;
                                }
                            }
                            .info{
                                font-size: 12px;
                                .btn-reply{
                                    color: #20a0ff;
                                    padding-left: 8px;
                                }
                            }
                        }
                    }
                    .reply-input{
                        height: 0;
                        overflow: hidden;
                        margin-left: 55px;
                        transition: height .3s;;
                        textarea{
                            box-sizing: border-box;
                            width: 100%;
                            height: 60px;
                            border: 1px solid #e6e6e6;
                            resize: none;
                        }
                        &.show{
                            height: 97px;
                            padding-bottom: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>