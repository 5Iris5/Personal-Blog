<template>
	<div id="aside">
		<div class="el-s-login">
			<div v-if="ifLogin">
				<div class="icon">
					<el-tooltip class="item" effect="dark" content="点击可修改头像" placement="top-start">
						<!-- <img :src="login.photo" alt="用户图像" class="photo" @click="changePhoto"> -->
						<img :src="login.photo" alt="用户头像" class="photo" @click="ifAvatorVisible = true">
					</el-tooltip>
					<!-- <el-button>上左</el-button> -->
					<p class="username">昵称：<span>{{login.user}}</span></p>
					<el-button type="text" size="mini" @click="logout">退出登录</el-button>
				</div>
			</div>
			<div v-else>
				<div class="btn">
					<el-button type="primary" @click="ifLoginVisible = true">登录</el-button>
					<el-button type="success" @click="ifRegVisible = true">注册</el-button>
				</div>
			</div>
		</div>
		<div class="el-s-hot">
			<h3 class="hot-tit">
				<i class="iconfont icon-huo"></i>
				<span>热门文章</span>
			</h3>
			<div class="hot-list">
				<ul>
					<li v-for="(item, index) in articleHot" :key="item.title">
						<i>{{index + 1}}</i>
						<router-link :to="'/detail/' + item._id">{{item.title}}</router-link>
						<!-- <a href="">{{item.title}}</a> -->
					</li>
				</ul>
			</div>
		</div>
		<div class="el-s-tag">
			<h3 class="tag-tit">
				<i class="iconfont icon-tag"></i>
				<span>标签云</span>
			</h3>
			<div class="tag-list">
				<ul>
					<li v-for="item in articleTag" :key="item">
						<router-link :to="'/category/1?tag=' + item">{{item}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="el-s-link">
			<h3 class="link-tit">
				<i class="iconfont icon-visitor"></i>
				<span>最新访客</span>
			</h3>
			<div class="link-list">
				<ul class="clearfix">  
					<li	 
						v-for="(item, index) in visitors" 
						v-if="item.user"
						:key="index"
						:style="{backgroundImage: 'url(' + item.user.photo + ')'}">
						<p>{{item.user.user}}</p>
					</li>
				</ul>
			</div>
		</div>

		<!-- 登录注册组件 -->
		<Register :dialogVisible="ifRegVisible" @handleClose="closeRegister"></Register>
		<Login :dialogVisible="ifLoginVisible" @handleClose="closeLogin"></Login>
		<Avator :dialogVisible="ifAvatorVisible" @handleClose="closeAvator"></Avator>
	</div>
</template>

<script>
// 获取接口
import request from '../api/index';
let getArticleHot = request.getArticleHot;
let getArticleTags = request.getArticleTags;
let getLoginState = request.getLoginState;
let getLogout = request.getLogout;
let getVisitor = request.getVisitor;
// console.log(getLogout)
// 页面开启监控eventbus
// import Bus from '../assets/js/eventbus';

import Register from '@/components/Register'
import Login from '@/components/Login'
import Avator from '@/components/Avator'
export default {
	name: 'Aside',
	data(){
		return {
			// 热门文章
			articleHot: '',
			// 标签云
			articleTag : '',
			// 最新访客
			visitors: [],
			// 路由ID
			// currentID: 1,

			// 登录弹窗/注册/修改头像弹窗
			ifRegVisible: false,
			ifLoginVisible: false,
			ifAvatorVisible: false,

			// 登录相关信息
			ifLogin: false,
			login: {
				user: '',
				photo: ''
			}
		}
	},
	components: {
		Register,
		Login,
		Avator
	},
	methods: {
		closeRegister(ifShowLogin){
			this.ifRegVisible = false;
			if(ifShowLogin){
				setTimeout(()=>{
					this.ifLoginVisible = true;
				}, 1000)
			}			
		},
		closeLogin(ifShowReg){
			this.ifLoginVisible = false;
			if(ifShowReg){
				setTimeout(()=>{
					this.ifLogin = true;
				}, 1000)
			}	
		},
		closeAvator(){
			this.ifAvatorVisible = false
		},
		// changePhoto(){
		// 	this.ifAvatorVisible = true
		// 	console.log('change')
		// },
		logout(){
			getLogout().then(res=>{
				if(res.data.code === 0){
					this.$message({
						message: res.data.msg,
						type: 'success',
						duration: 1500
					});
				}else{
					this.$message({
						message: '退出失败',
						type: 'error',
						duration: 1500
					});
				}
				window.location.reload();
				// console.log(res)
			}).catch((err) => {
				console.log('退出登录接口：请求发送失败...')
			})	
		}
	},
	created(){
		getArticleHot().then((res) => {
			// console.log(res)
			this.articleHot = res.data.data;
		}).catch((err) => {
			console.log('热门文章接口：请求发送失败...')
		}),
		getArticleTags().then((res)=>{
			// console.log(res)
			this.articleTag = res.data.data.tags;
		}).catch((err)=>{
			console.log('标签云接口：请求发送失败...')
		}),
		getLoginState().then(res=>{
			// console.log(res)
			if(res.data.loginInfo){
				this.ifLogin = true;
				this.login.user = res.data.loginInfo.user;
				this.login.photo = res.data.loginInfo.photo;
			}else{
				this.ifLogin = false;
			}
		}).catch(err=>{
			console.log('登录状态接口：请求发送失败...')
		}),
		getVisitor().then(res=>{
			this.visitors = res.data.data
			// console.log(this.visitors)
			// console.log(this.visitors[0].user.user, this.visitors[0].user.photo)
		}).catch(err=>{
			console.log('最新访客接口：请求发送失败...')
		})
	}
	// mounted(){
	// 	// 监听兄弟组件article里面$emit()发送过来的数据val
	// 	Bus.$on("changeID", function(val){
	// 		console.log('接受article组件传递过来的数据：' + val)
	// 		this.currentID = val
	// 		console.log("this.currentID: " + this.currentID)
	// 	})
	// }
}
</script>

<style scoped lang="less">
#aside{
	margin-bottom: 20px;
	>.el-s-login{
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
		height: 200px;
		border-radius: 8px;
		background-color: #fff;
		background: linear-gradient(to bottom, #d7e5ff 0%, #5084e0 50%, #fff 35%, #fff 100%);
		box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
		&::before{
			display: block;
			content: '';
			width: 100%;
			height: 20%;
			background-image: url(../assets/images/blog.png);
			background-size: cover;
		}
		.icon{
			.photo{
				display: block;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin: 0 auto 15px;
				line-height: 80px;
			}
			.username{
				font-size: 14px;
				text-align: center;
				color: #2c3e50;
				span{
					color: #5084F1;
				}
			}
			/deep/.el-button--text{
				float: right;
				color: orangered;
			}
		}
		.btn{
			margin-top: 28%; 
			padding: 0 45px;
		}
	}
	>.el-s-hot{
		box-sizing: border-box;
		width: 100%;
		margin-top: 20px;
		// padding: 20px;
		padding: 5px 20px 20px;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
		.hot-tit{
			height: 30px;
			line-height: 30px;
			// padding-bottom: 5px;
			padding-bottom: 20px;
			border-bottom: 1px solid #eeee;
			color: #2c3e50;
			i{
				padding-right: 5px;
				color: #2c3e50;
				font-size: 24px;
				// vertical-align: middle;
			}
			span{
				font-size: 16px;
			}
		}
		.hot-list{
			padding-top: 10px;
			ul{
				li{
					height: 30px;
					line-height: 30px;
					font-size: 14px;
					overflow: hidden;
					// text-overflow: ellipsis;
					white-space: nowrap;
					a{
						display: inline-block;
						padding-left: 10px;
						transition: color .3s;
						color: #2c3e50;
						&:hover{
							color: #20a0ff;
							text-decoration: underline;
						}
					}
					i{
						display: inline-block;
						width: 20px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						font-style: normal;
						color: #666;
						border-radius: 50%;
						background-color: #edefee;
					}
					&:nth-child(1){
						i{
							background-color: orangered;
						}
					}
					&:nth-child(2){
						i{
							background-color: lightseagreen;
						}
					}
					&:nth-child(3){
						i{
							background-color: #20a0ff;
						}
					}
				}
			}
		}
	}
	>.el-s-tag{
	   box-sizing: border-box;
		width: 100%;
		margin-top: 20px;
		// padding: 20px;
		padding: 5px 20px 20px;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
		.tag-tit{
			height: 30px;
			line-height: 30px;
			// padding-bottom: 5px;
			padding-bottom: 20px;
			border-bottom: 1px solid #eeee;
			color: #2c3e50;
			i{
				padding-right: 5px;
				color: #2c3e50;
				font-size: 24px;
				// vertical-align: middle;
			}
			span{
				font-size: 16px;
			}
		} 
		.tag-list{
			padding-top: 10px;
			ul{
				display: flex;
				flex-wrap: wrap;
				// justify-content: space-between;
				li{
					padding: 5px 8px;
					margin: 0 10px 8px 0;
					background: linear-gradient(to right, #d7e5ff 0%, #5084e0 70%, #d7e5ff 100%);
					// background-color: rgba(32,160,255,.2);
					border-radius: 3px;
					// flex: 1;
					a{
						display: block;
						width: 100%;
						height: 100%;
						color: #2c3e50;
						font-size: 12px;
					}
				}
			}
		}
	}
	>.el-s-link{
	   box-sizing: border-box;
		width: 100%;
		margin-top: 20px;
		// padding: 20px;
		padding: 5px 20px 20px;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 5px 5px rgba(31, 45, 61, 0.1);
		.link-tit{
			height: 30px;
			line-height: 30px;
			// padding-bottom: 5px;
			padding-bottom: 20px;
			border-bottom: 1px solid #eeee;
			color: #2c3e50;
			i{
				padding-right: 5px;
				color: #2c3e50;
				font-size: 24px;
				// vertical-align: middle;
			}
			span{
				font-size: 16px;
			}
		}
		.link-list{
			padding-top: 10px;
			ul{
				// display: flex;
				// justify-content: space-between;
				// flex-wrap: wrap;
				li{
					float: left;
					margin-right: 6px;
					position: relative;
					width: 55px;
					height: 55px;
					margin-bottom: 5px;;
					background-size: cover;
					cursor: pointer;
					p{
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						font-size: 12px;
						text-align: center;
						background-color: rgba(0, 0, 0, .1);
						color: #666;
					}
					&:nth-child(4n){
						margin-right: 0;
					}
				}
			}
		} 
	}
}
</style>
