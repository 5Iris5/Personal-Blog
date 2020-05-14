<template>
    <div class="link">
      <Nav></Nav>
      <div class="link-main">
          <!-- 标题 -->
          <h3 class="l-m-tit">情绪日记</h3>
          <div class="l-m-appli">
              <div class="appli-wrap">
                  <h4 class="appli-tit">主题博客</h4>
              </div>
          </div>
          <div class="l-m-blogger">
              <ul class="b-lists">
                  <li class="b-item">
                    <a class="b-con" href="https://www.xuanmo.xin" target="_blank" >
                        <div class="b-i-host">
                            <img src="https://upyun.xuanmo.xin/images/logo-3.png" alt="">
                            <h4>Xuanmo Blog</h4>
                        </div>
                        <p class="b-i-desc">轩陌前端博客，个人前端笔记与案例展示、学习经验交流！</p>
                    </a>
                  </li>
                  <li class="b-item">
                    <a class="b-con" href="https://www.yanshisan.cn" target="_blank" >
                        <div class="b-i-host">
                            <img src="https://www.yanshisan.cn/logo.png" alt="">
                            <h4>燕十三</h4>
                        </div>
                        <p class="b-i-desc">燕十三·一个人的江湖</p>
                    </a>
                  </li>
                  <li class="b-item">
                    <a class="b-con" href="https://www.liyunjian.com" target="_blank" >
                        <div class="b-i-host">
                            <img src="https://oss.liyunjian.com/wp-content/uploads/2020/02/1582594977-20200225-ede23dfb69314bd78b585d58b785dd2b.png" alt="">
                            <h4>云上月光</h4>
                        </div>
                        <p class="b-i-desc">想要做人生的玩家...</p>
                    </a>
                  </li>
              </ul>
          </div>
          <!-- 友链申请说明 -->
          <div class="l-m-appli">
              <div class="appli-wrap">
                  <h4 class="appli-tit">链接申请说明</h4>
                  <p class="appli-ask">
                      <span><i class="iconfont icon-tubiaoguifan--"></i>擦边球站</span>
                      <span><i class="iconfont icon-tubiaoguifan--"></i>经常宕机</span>
                      <span><i class="iconfont icon-tubiaoguifan--"></i>红标报毒</span>
                      <span><i class="iconfont icon-gou"></i>原创优先</span>
                      <span><i class="iconfont icon-gou"></i>技术优先</span>
                      <span><i class="iconfont icon-gou"></i>文章不低于20篇</span>
                  </p>
                  <p class="appli-format">
                        交换友链可在留言板留言，本站信息如下：<br>
                        名称：IrisLong <br>
                        网址：https://www.irislong.cn <br>
                        图标：https://www.irislong.cn/logo.png <br>
                        描述：IrisLong·岁月从来不曾辜负你 <br>
                  </p>
                  <p class="appli-hour">正常情况下，将在提交申请后的48小时内审核完毕，如超时未通过，请私信我。</p>
              </div>
          </div>
          <!-- 友链列表 -->
          <div class="l-m-blogger">
              <ul class="b-lists">
                  <li class="b-item" v-for="(item, index) in blogLinks" :key="index">
                    <a class="b-con" :href="item.href" target="_blank" >
                        <div class="b-i-host">
                            <img :src="item.src" alt="">
                            <h4>{{item.nick}}</h4>
                        </div>
                        <p class="b-i-desc">{{item.desc}}</p>
                    </a>
                  </li>
              </ul>
          </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
  export default {
    name: 'Link',
    components: {
      Nav,
      Footer
    },
    data(){
        return {
            blogLinks: [
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                },
                {
                    href: 'www.baidu.com',
                    src: require('../../assets/images/intro.jpg'),
                    nick: 'Victory-Blog',
                    desc: '前端兜兜转转嘻嘻哈哈发货发发甲方法和老大回复发挥路上的风景'
                }
            ]
        }
    }
  }
</script>

<style lang="less" scoped>
.link{
    padding-top: 80px;
  >.link-main{
        box-sizing: border-box;
        // width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 50px;
        >h3.l-m-tit{
            height: 60px;
            padding-bottom: 10px; 
            font-size: 0;
            background: url(../../assets/images/link.png) no-repeat top center;
        }
        >.l-m-appli{
            padding: 10px;
            // background: #cfc;
            .appli-wrap{
                padding: 20px;
                line-height: 1.8;
                color: #2c3e50;
                font-size: 14px;
                background: #fff;
                box-shadow: 0 10px 10px rgba(25, 20, 30, 0.1);
                border-radius: 8px;
                .appli-tit{
                    margin-bottom: 15px;
                    padding-left: 15px;
                    border-left: 4px solid #20a0ff;
                    font-size: 18px;
                }
                .appli-ask{
                    padding-left: 15px;
                    i{
                        font-weight: bold;
                        color: #ff0036;
                    }
                    span{
                        padding-right: 10px;
                    }
                    
                }
                .appli-format{
                    padding-left: 15px;
                    margin: 15px 0;
                }
                .appli-hour{
                    padding-left: 15px;
                }
            }
        }
        >.l-m-blogger{
            margin-top: 15px;
            padding: 10px;
            ul.b-lists{
                display: flex;
                // justify-content: space-between;
                flex-wrap: wrap;
                li.b-item{
                    box-sizing: border-box;
                    width: 24%;
                    margin: 0 14px 15px 0;
                    padding: 15px 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.05);
                    transition: all .25s ease-in-out;
                    a.b-con{
                        display: block;
                        color: #2c3e50;
                        .b-i-host{
                            display: flex;
                            img{
                                display: block;
                                width: 50px;
                                height: 50px;
                                border-radius: 100%;
                            }
                            h4{
                                flex: 1;
                                color: #333;
                                height: 50px;
                                overflow: hidden;
                                padding-left: 15px;
                                line-height: 50px;
                            }
                        }
                        p.b-i-desc{
                            // height: 75px;
                            margin-top: 10px;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 14px;
                            line-height: 1.8;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                        }
                    }
                    &:nth-child(4n){
                        margin-right: 0;
                    }
                    &:hover{
                        transform: translateY(-7px);
                    }
                }
            }
        }
  }
}
</style>