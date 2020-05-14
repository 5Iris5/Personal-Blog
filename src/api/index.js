import axios from 'axios';

// 配置默认参数
axios.defaults.baseURL = 'http://localhost:3000';  // 默认访问地址
axios.defaults.withCredentials = true;   // 跨域允许携带cookie ->  不带后台无法操作session
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  // 设置post请求格式

export default {
	/* 标签云接口 */
    getArticleTags(){
        return axios.post('/article/getTags')    
    },
	
	/* 热门文章接口 */
	getArticleHot(){
		return axios.post('/article/getHot')
	},

	/*
	* 文章列表接口 
	* 疑问: 为什么要是闭包?  猜测:内部函数里面需要使用到外部函数中的参数
	* @params 
	* 	index分页索引
	*	tag标签
	*	isFresh是否跳数据，默认为不跳
	* @return 一个promise对象
	* */
	getArticleList: (function(){
		let skip, limit
		return function(index, tag, isFresh=false){
			// true 翻页,根据页码跳数据
			if(isFresh){
				skip = (index-1)*limit;
			}else{  // false 路由参数变化，从0开始选取数据，不需要跳
				skip = 0;
			}
			limit = 8;
			let options = {skip, limit, tag}
			// console.log(skip, limit, tag)
			return axios.post('/article/getList', options)
		}
	})(),

	/* 
	* tags标签下文章总数 
	* @params
	* tag 当前点击标签
	* */
	getArticleNum(tag){
			// console.log('标签：' + tag)
			return axios.post('/article/getNum', {tag})
	},

	/* 获取文章内容(id获取) */
	getArticle(_id){
		return axios.post('/article', {_id})
	},

	/* 延伸阅读 */ 
	getArticleExtend(tag){
		return axios.post('/article/extend', {tag})
	},

	/*
	* 搜索接口 
	* 疑问: 为什么要是闭包?  猜测:内部函数里面需要使用到外部函数中的参数
	* @params 
	* 	index分页索引
	*	keyword关键词
	*	isFresh是否跳数据，默认为不跳
	* @return 一个promise对象
	* */
	getArticleSearch: (function(){
		let skip, limit
		return function(index, keyword, isFresh=false){
			// true 翻页,根据页码跳数据
			if(isFresh){
				skip = (index-1)*limit;
			}else{  // false 路由参数变化，从0开始选取数据，不需要跳
				skip = 0;
			}
			limit = 8;
			let options = {skip, limit, keyword}
			// console.log(skip, limit, keyword)
			return axios.post('/article/getSearch', options)
		}
	})(),

	/* 
	* 搜索文章总条数接口
	* params
	*	keyword 搜索词
	*/
	getSearchInfo(keyword){
		return axios.post('/article/getSearchInfo', {keyword})
	},

	/* 获取验证码图片接口 */
	getRegisterVCode(){
		return axios.post('/register/vcode')
	},

	/* 验证码失焦接口 */
	getCheckVCode(vcode){
		return axios.post('/register/checkVCode', {vcode})
	},

	/* 
	* 注册接口 
	* @params
	*	options 一个包含用户名，密码，确认密码，验证码的对象
	* */
	postRegister(options){
		return axios.post('/register', options)
	},

	/* 
	* 登录接口 
	* @params
	*	options 一个包含用户名与密码的对象
	* */
	postLogin(options){
		return axios.post('/login', options)
	},

	/* 登录状态接口 */ 
	getLoginState(){
		return axios.post('/login/getLoginState')
	},

	/* 退出登录接口 */ 
	getLogout(){
		return axios.post('/login/getLogout')
	},

	/* 最近访客接口 */
	getVisitor(){
		return axios.post('/visitor')
	},

	/* 
	* 提交留言接口 
	* options => {user: '', content: ''}
	* */
	postMessage(options){
		return axios.post('/guest/commitMsg', options)
	},

	/* 获取留言列表 */
	getMessageList(skip=0, limit=5){
		return axios.post('/guest/getMsgList', {skip, limit})
	},

	/*
	* 留言列表里面的回复接口
	* options => {parentID: '', user: '', content: '', replyuser: ''} 
	* */ 
	postChildMessage(options){
		return axios.post('/guest/commitChildMsg', options)
	}
}
