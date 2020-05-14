<template>
  <div id="nav">
    <div class="nav-main">
        <h1 class="n-m-logo">IrisLong</h1>
        <div class="n-m-search">
            <input type="text" placeholder="请输入关键字查询" v-model="searchInput" @keydown.enter = "handleSearch" >
            <i class="el-icon-search" @click="handleSearch"></i>
        </div>
        <div class="n-m-nav">
            <ul :class="['nav-menu', 'nav-menu-' + activeIndex]">
                <li class="nav-menu-item">
                    <i class="iconfont icon-shouye-1"></i>
                    <router-link to="/"> 首页</router-link>
                 </li>
                <li class="nav-menu-item">
                    <i class="iconfont icon-WEBqianduan"></i> 前端<i class="iconfont icon-downarrow1"></i>
                    <ul class="menu-item-submenu">
                        <li class="submenu-item">
                            <i class="iconfont icon-html5"></i>
                            <router-link to="/category/1?tag=HTML5"> HTML5</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-css"></i>
                            <router-link to="/category/1?tag=CSS3"> CSS3</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-js"></i>
                            <router-link to="/category/1?tag=JavaScript"> JavaScript</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-vuejs"></i>
                            <router-link to="/category/1?tag=Vue"> Vue</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-react"></i>
                            <router-link to="/category/1?tag=React"> React</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-menu-item">
                    <i class="iconfont icon-shujuku"></i> 后端<i class="iconfont icon-downarrow1"></i>
                    <ul class="menu-item-submenu">
                        <li class="submenu-item">
                            <i class="iconfont icon-node-js"></i>
                            <router-link to="/category/1?tag=Nodejs"> Node.js</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-mongodb"></i>
                            <router-link to="/category/1?tag=MongoDB"> MongoDB</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-linux"></i>
                            <router-link to="/category/1?tag=Linux"> Linux</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-menu-item">
                    <i class="iconfont icon-gongju"></i> 
                    <router-link to="/category/1?tag=软件"> 软件</router-link>
                </li>
                <li class="nav-menu-item">
                    <i class="iconfont icon-xiangmuguanli"></i> 
                    <router-link to="/category/1?tag=项目"> 项目</router-link>
                </li>
                <li class="nav-menu-item">
                    <i class="iconfont icon-ren-copy"></i> 关于<i class="iconfont icon-downarrow1"></i>
                    <ul class="menu-item-submenu">
                        <li class="submenu-item">
                            <i class="iconfont icon-woman"></i>
                            <router-link to="/intro"> 个人介绍</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-riji"></i>
                            <router-link to="/phrase"> 说说</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-lianjie"></i>
                            <router-link to="/link"> 友链申请</router-link>
                        </li>
                        <li class="submenu-item">
                            <i class="iconfont icon-chat"></i>
                            <router-link to="/guest"> 留言板</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-menu-item">
                    <i class="iconfont icon-icon"></i> 
                    <router-link to="/category/1?tag=日常唠嗑"> 日常唠嗑</router-link>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
// 页面开启监控eventbus
import Bus from '../assets/js/eventbus';
export default {
    name: 'Nav',
    data(){
        return {
            // 搜索框 v-model
            searchInput: '',
            ifSearchVisible: false,

            // 不需要传参的路由
            // aboutRouter: ['Home', 'Intro', 'Phrase', 'Guest'],
			// 需要传参的路由
			// tagRouter: ['HTML5', 'CSS3', 'JavaScript', 'Vue', 
			// 'React', 'Nodejs', 'MongoDB', 'Linux', 'tools', 'project', ],
			// nav路由
			navRouter: ['Home', 'HTML5', 'CSS3', 'JavaScript', 'Vue', 'React',
			'Nodejs', 'MongoDB', 'Linux', '软件', '项目', 'Intro', 'Phrase', 'Link', 'Guest', '日常唠嗑']
        }
    },
    computed: {
        // 选中路由  --->  这特么写的是什么狗屎代码啊！！！
        activeIndex(){
            let about = this.navRouter.indexOf(this.$route.query.tag || this.$route.name);
            let tag = this.$route.query.tag;
            // console.log(tag)
            // console.log(about)
			if(about === 0 || tag === '首页'){
				return 0
			}else if(about>=1 && about<=5){
				return 1
			}else if(about>5 && about<=8){
				return 2
			}else if(about === 9){
				return 3
			}else if(about === 10){
				return 4
			}else if(about>10 && about<=14){
				return 5
			}else if(about === 15){
				return 6
			}
        }
    },
    methods: {
        handleSearch(){
            let keyword = this.searchInput.trim()
            console.log('keyword: ' + keyword)
            if(keyword){
                // 发送参数keyword给组件search
                this.$router.push('/search/1?keywords=' + keyword).catch(()=>{});
                /*
                * 问题：页面刷新后，从其他路由第一次进入search页面，$emit没有发送携带参数
                */ 
                Bus.$emit("getkw", keyword);
                // console.log('进入bus...')
            }else{
                this.$message({
                    message: '请注意：查询条件不能为空！',
                    type: 'error',
                    duration: 1000
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
#nav{
    // 固定位置且设置层级为最高
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    >.nav-main{
        box-sizing: border-box;
        // width: 100%;
        max-width: 1200px;
        height: 60px;
        margin: 0 auto;
        // 左右固定边距50px
        padding: 0 50px;
        // background-color: #ccc;
        // 超出隐藏 窗口宽度<1095,n-m-nav会溢出
        // overflow: hidden;
        @media (max-width: 1190px) {
            >.n-m-nav{
                display: none;
            }
        }
        >.n-m-logo{
            float: left;
            font-size: 0;
            width: 100px;
            height: 60px;
            background-size: cover;
            background-image: url('../assets/images/logo.png');
            // background-color: aqua;
        }
        >.n-m-search{
            float: right;
            width: 200px;
            height: 32px;
            margin: 13px 0;
            border: 1px solid #eee;
            border-radius: 5px;
            input{
                width: 165px;
                height: 32px;
                line-height: 32px;
                text-indent: 1em;
                font-size: 14px;
            }
            i{
                width: 35px;
                line-height: 32px;
                border-radius: 0 5px 5px 0;
                background-color: #ddd;       
                font-size: 18px;
                text-align: center;
                transition: .3s;
                &:hover{
                    background-color: #20a0ff;
                    color: #fff;
                }
            }
        }
        >.n-m-nav{
            float: right;
            width: 672px;
            height: 60px;
            // line-height: 60px;
            line-height: 42px;
            margin-right: 98px;
            // background-color: #ccf;
            .nav-menu{
                display: flex;
                // align-items: center;
                width: 100%;
                height: 100%;
                text-align: center;
                .nav-menu-item{
                    position: relative;
                    flex: 1;
                    width: 96px;
                    height: 100%;
                    color: #2c3e50;
                    // background-color: #ffc;
                    transition: color 0.3s;
                    // cursor: pointer;
                    a{
                        color: #2c3e50;
                        transition: color 0.3s;
                    }
                    &::after{
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: 0 auto;
                        content: '';
                        width: 0;
                        height: 2px;
                        background-color: #20a0ff;
                        -webkit-transition: width 0.3s;
                        transition: width 0.3s;
                    }
                    &:hover{
                        color: #20a0ff;
                        a{
                            color: #20a0ff;
                        }
                        &::after{
                            width: 100%;
                        }
                        .menu-item-submenu{
                            display: block;
                        }
                    }
                    .menu-item-submenu{
                        display: none;
                        position: absolute;
                        top: 85%;
                        left: 50%;
                        z-index: 1000;
                        transform: translateX(-50%);
                        width: 120px;
                        border-radius: 2px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0,0,0,.2);
                        color: #2c3e50;
                        &::before{
                            position: absolute;
                            content: "";
                            top: -10px;
                            left: 20%;
                            width: 0;
                            height: 0;
                            border-width: 5px;
                            border-style: solid;
                            border-color: rgba(0, 0, 0, 0)  rgba(0, 0, 0, 0) #fff rgba(0, 0, 0, 0);
                        }
                        .submenu-item{
                            padding: 5px 10px;
                            line-height: 1.5;
                            text-align: left;
                            cursor: pointer;
                            transition: transform .3s;
                            i,a{
                                color: #2c3e50;
                                font-size: 14px;
                                transition: color .3s;
                            }
                            &:hover{
                                background-color: rgba(8, 103, 255, 0.7);
                                transform: scale(1.05);
                                i,a{
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                // 选中导航样式与其他不一样
                &.nav-menu-0{
                    .nav-menu-item:nth-child(1){
                        i,a{
                            color: #20a0ff;
                        }
                        &::after{
                            width: 100%;
                        }
                    }
                }
                &.nav-menu-1{
                    .nav-menu-item:nth-child(2){
                        color: #20a0ff;
                        &::after{
                            width: 100%;
                        }
                        // 二级导航按钮不变色
                        >.menu-item-submenu{
                            i,a{
                                color: #2c3e50;
                            }
                        }
                    }
                }
                &.nav-menu-2{
                    .nav-menu-item:nth-child(3){
                        color: #20a0ff;
                        &::after{
                            width: 100%;
                        }
                        // 二级导航按钮不变色
                        >.menu-item-submenu{
                            i,a{
                                color: #2c3e50;
                            }
                        }
                    }
                }
                &.nav-menu-3{
                    .nav-menu-item:nth-child(4){
                        i,a{
                            color: #20a0ff;
                        }
                        &::after{
                            width: 100%;
                        }
                    }
                }
                &.nav-menu-4{
                    .nav-menu-item:nth-child(5){
                        i,a{
                            color: #20a0ff;
                        }
                        &::after{
                            width: 100%;
                        }
                    }
                }
                &.nav-menu-5{
                    .nav-menu-item:nth-child(6){
                        color: #20a0ff;
                        &::after{
                            width: 100%;
                        }
                        // 二级导航按钮不变色
                        >.menu-item-submenu{
                            i,a{
                                color: #2c3e50;
                            }
                        }
                    }
                }
                &.nav-menu-6{
                    .nav-menu-item:nth-child(7){
                        i,a{
                            color: #20a0ff;
                        }
                        &::after{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>
