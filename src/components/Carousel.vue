<template>
  <div id="carousel">
	  <!-- :autoplay="false" -->
    <el-carousel :interval="6000" arrow="always">
        <el-carousel-item v-for="item in article" :key="item.title">
            <img :src="item.photo" alt="">
            <div class="content">
				<h3>{{ item.title }}</h3>
				<a class="read-more">
					<i class="iconfont icon-arrow-right"></i>
					<span>阅读全文</span>
				</a>
			</div>
        </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    name: 'Carousel',
    data(){
        return {
			article: [
				{title: 'JS每日一题', photo: require('../assets/images/error.gif')},
				{title: '随笔', photo: require('../assets/images/timg.gif')},
				{title: '项目bug', photo: require('../assets/images/intro.jpg')},
				{title: '算法提升', photo: require('../assets/images/leaf.jpg')}
			]
        }
    }
}
</script>

<style scoped lang="less">
#carousel{
	margin-bottom: 20px;
	.el-carousel{
		.el-carousel__item{
			img{
				position: relative;
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
			.content{
				position: absolute;
				top: 40%;
				left: 12%;
				width: 60%;
				height: 30%;
				h3{
					color: #fff;
				    font-size: 24px;
					text-shadow: 0 3px 5px rgba(0,0,0,.3);
				}
				a.read-more{
					display: block;
					width: 110px;
					height: 30px;
					margin-top: 20px;
					line-height: 33px;
					text-align: center;
					cursor: pointer;
					border: 1px solid rgba(255,255,255,.3);
					border-radius: 7px;
					text-shadow: 0 2px 2px rgba(0,0,0,.2);
					transition: .25s;
					i{
						display: inline-block;
						margin-top: -15px;
						color: #fff;
						font-size: 24px;
						padding-right: 5px;
					}
					span{
						color: #fff;
						font-size: 14px;
						vertical-align: top;
					}
					&:hover{
						background: #fff;
						border: 1px solid #fff;
						box-shadow: 0 5px 10px rgba(0,0,0,.15);
						i,span{
							color: #20a0ff;
						}
					}
				}
			}
		    // &:nth-child(2n){
		    //     background-color: #99a9bf;
		    // }
		    // &:nth-child(2n+1){
		    //     background-color: #d3dce6;
		    // }
		}
	}
}
</style>