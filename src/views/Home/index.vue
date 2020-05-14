<template v-slot:carousel>
  <div class="home">
    <Nav></Nav>
    <div id="container">
      <div class="container-main">
        <el-container>
            <el-main>
              <Carousel></Carousel>
              <Article></Article>
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
// @ is an alias to /src
import Nav from '@/components/Nav'
import Carousel from '@/components/Carousel'
import Article from '@/components/Article'
import Aside from '@/components/Aside'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Nav,
    Carousel,
    Article,
    Aside,
    Footer
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
        // background-color: bisque;
        >.el-container{
            // background-color: #cfc;
            .el-main{
                width: 800px;
                // height: 500px;
                padding: 0;
                margin-right: 20px;
                // background-color: #fff;
            }
            .el-aside{
                width: 280px;
                // background-color: #fcf;     
            }
        }
    }
}
</style>


