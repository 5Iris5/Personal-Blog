<div align="center">
  <h1>Personal-Blog</h1>
</div>

## ⚡ 简介

个人搭建的基于 vue2.x、vue-cli、vuex、axios、vue-router、element-ui 和 node、express、mongoDB 等主流技术的全栈博客项目。
PS：这是一个已经上线的全栈博客项目，前端部分原计划做成响应式效果，目前上线的部分是 PC 端，响应式仍在开发中。整个项目分为两期来做，一期做后台管理中心，二期来做前端平台。

## ✨ 功能模块

- 用户登录注册退出以及用户头像的修改
- 最新访客记录
- 用户留言、时间轴
- 热门文章列表展示
- 文章详情页面展示
- 文章标签分类、文章信息检索、列表分页等。
- 文章的发表以及管理
- 用户权限
- 留言管理
- 日记的发表以及管理
- 友链的添加删除等

## 📚 更多描述：

1. 项目的 UI设计，模块架构以及数据库的设计都是自己摸索。
2. element-ui 里面的表单组件结合 cookie/session 以及 axios 交互，完成用户登录注册退出的功能，为增加安全性，注册验证使用到svg-captcha 验证码提升安全性能。
3. 同时使用avatar/multer 自定义设置用户头像。页面的路由切换主要通过动态路由传参以及字节传参的方式，搜索功能使用eventBus 完成组件间的数据共享。
4. 使用 layui的富文本以及父子组件传值完成留言功能，留言面板的下方留言列表分流展示，且用定时器做了函数节流等。
5. 后台管理中心也是element-ui 进行布局，主要复杂的功能为编辑器模块，编辑器前采用的时 layui 的编辑器，但是没办法插入代码块以及上传图片的接口比较复杂，根据业务逻辑后期会重新更改新的编辑器来完成更好的效果。
6. 为了提高安全性，使用crypto对用户密码进行了加密处理等

## 🚀 开发前端部分

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 🚀 开发后端部分

```
# node
npm install
node server/bin/www
```

## ✔️ 项目预览图


## 📄 License

[MIT](./LICENSE)
Copyright (c) 2020 [IrisLong](https://github.com/5Iris5)
