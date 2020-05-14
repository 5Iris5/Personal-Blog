<template>
    <div class="intro">
      <Nav></Nav>
      <div class="intro-main">
        <h3 class="i-m-tit">自我介绍</h3>
        <!-- 友链申请说明 -->
        <div class="i-m-con">
          <article>
            <section>
              <h4 class="s-tit">关于我</h4>
              <p class="s-desc">2018年6月毕业于湖南某二本院校，至今仍在前端的路上兜兜转转，因为热爱，所以一想到可能要放弃就真的很不甘心啊。</p>
              <div class="s-detail">
                <p>可以通过以下方式联系到我</p>
                <ul class="d-lists">
                  <li class="d-l-item">邮箱：<a href="mailto:2798382001@qq.com">2798382001@qq.com</a></li>
                  <li class="d-l-item">Github：<a href="https://github.com/5Iris5" target="_blank">https://github.com/5Iris5</a></li>
                </ul>
              </div>
            </section>
            <section>
              <h4 class="s-tit">关于本站</h4>
              <p class="s-desc">本站于2020年4月正式上线，主要用于存放学习笔记、知识点案例、项目经验总结等相关内容。是前端漫漫长路中持续学习的证明，想好好的经营下去。</p>
              <div class="s-detail">
                <p>本站结构</p>
                <ul class="d-lists">
                  <li class="d-l-item">前端：<code>Vue.js + Element-ui</code></li>
                  <li class="d-l-item">后端：<code>Node.js + Express + MongoDB</code></li>
                </ul>
              </div>
            </section>
            <section>
              <h4 class="s-tit">关于版权</h4>
              <p class="s-desc">本站UI为自由创作，如果你喜欢，那么只要在使用时注明出处，
                您就可以对本站所有原创内容进行转载、节选、二次创作，但是您不得对其用于商业目的。</p>
            </section>
            <section>
              <h4 class="s-tit">特别说明</h4>
              <div class="s-detail">
                <ul class="d-lists">
                  <li class="d-l-item">本站文章仅代表个人观点，和任何组织或个人无关。</li>
                  <li class="d-l-item">本站前端开发代码没有考虑对IE浏览器的兼容。</li>
                  <li class="d-l-item">目前仅完善到位PC端页面布局，响应式布局仍在更新中。</li>
                </ul>
              </div>
            </section>
          </article>
        </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
  export default {
    name: 'Intro',
    components: {
      Nav,
      Footer
    }
  }
</script>

<style lang="less" scoped>
.intro{
  padding-top: 80px;
  >.intro-main{
    box-sizing: border-box;
      // width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 50px;
      >h3.i-m-tit{
         height: 60px;
        padding-bottom: 10px; 
        font-size: 0;
        background: url(../../assets/images/intr.png) no-repeat top center;
      }
      >.i-m-con{
        // background-color: #cfc;
        article{
          padding: 10px;
          section{
            margin-bottom: 10px;
            padding: 20px;
            line-height: 1.8;
            color: #2c3e50;
            font-size: 14px;
            background: #fff;
            box-shadow: 0 10px 10px rgba(25, 20, 30, 0.1);
            border-radius: 8px;
            h4.s-tit{
              margin-bottom: 15px;
              padding-left: 15px;
              border-left: 4px solid #20a0ff;
              font-size: 18px;
            }
            .s-desc{
              margin-bottom: 15px;

              padding-left: 20px;
            }
            .s-detail{
              padding-left: 20px;
            }
          }
        }
      }
  }
}
</style>