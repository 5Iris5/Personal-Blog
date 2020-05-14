<template>
  <div class="phrase">
    <Nav></Nav>
    <div class="block">
      <h3 class="b-tit">情绪日记</h3>
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="item in phraseList" :key="item.date"
          :timestamp="item.date" 
          placement="top">
          <el-card >
            <h4>{{item.txt}}</h4>
            <img v-for="img in item.img" :key="img" :src="img" alt="">
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
export default {
  name: 'Phrase',
  components: {
    Nav,
    Footer
  },
  data(){
    return {
      reverse: true,  // true ->  倒序
      phraseList: [
        {
          txt: '心情日记1 晴雨',
          img: [
            'http://localhost:3000/images/phraseImages/smile.jpg',
            'http://localhost:3000/images/phraseImages/simple.jpg'
          ],
          date: '2020-01-02'
        },
        {
          txt: '心情日记2 晴雨',
          img: [],
          date: '2020-02-02'
        },
        {
          txt: '心情日记3 晴雨',
          img: ['http://localhost:3000/images/phraseImages/peace.jpg'],
          date: '2020-03-02'
        },
        {
          txt: '心情日记4 晴雨',
          img: ['http://localhost:3000/images/phraseImages/happy.gif'],
          date: '2020-03-10'
        },
        {
          txt: '心情日记5 晴雨',
          img: [],
          date: '2020-03-20'
        },
        {
          txt: '心情日记6 晴雨',
          img: ['http://localhost:3000/images/phraseImages/sad.jpg'],
          date: '2020-03-28'
        },
        {
          txt: '心情日记8 雨绵绵',
          img: [],
          date: '2020-04-08'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.phrase{
  >.block{
    box-sizing: border-box;
    // width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 50px;
    .b-tit{
      height: 60px;
      padding-bottom: 10px; 
      font-size: 0;
      background: url('../../assets/images/phrase.png') no-repeat top center;
      // background-position-x: -7%;
    }
    .el-timeline{
      /deep/.el-timeline-item__timestamp{
        color: #484348;
        font-size: 16px;
      }
    }
    .el-card__body{
      img{
        display: inline-block;
        height: 150px;
        margin: 10px 15px 0 0;
        border-radius: 7px;
      }
    }
  }
}
</style>
