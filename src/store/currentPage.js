// 动态路由id参数 与 页面索引值 双向绑定
export default({
	namespaced: true,  // 建立命名空间
	state:{
        currentPage: 1
    },
	getters:{},
	mutations:{},
	actions:{
        // 页码变化
        handlePageChange(context){
            console.log("第几页? " + this.currentPage)
            // 重新刷新渲染页面数据 ->  同步跟新动态路由id 根据页码跳数据加载(true)
            getArticleList(this.currentPage, this.tag, true).then((res) => {
                this.articleList = res.data.data;
                console.log("handleCurrentChange页码：" + this.currentPage,"tag标签：" + this.tag, "tag标签下文章总数" + this.articleList.length);
                // if(this.articleList.length === 0){
                //     this.isNot = true
                // }else{
                //     this.isNot = false
                // }
            }).catch(()=>{
                console.log('文章列表分页接口：请求发送失败...')
            })
        }
    }
})