import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'Home',
    // component: () => import('../views/Home')
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/intro',
    name: 'Intro',
    component: () => import('../views/Intro')
  },
  {
    path: '/phrase',
    name: 'Phrase',
    component: () => import('../views/Phrase')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/Link')
  },
  {
    path: '/guest',
    name: 'Guest',
    component: () => import('../views/Guest')
  },
  // 文章详情页面 -> 动态路由根据文章id跳转
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/Detail')
  },
  // 导航分类/标签云页面 -> 路由传参渲染页面 -> 123翻页:parmas字段传参?query
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/Category')
  },
  // 搜索页面
  {
    path: '/search/:id',
    name: 'Search',
    component: () => import('../views/Search')
  },
  {
    path: '*',
    name: 'error',
    component: () => import('../views/Error')
  }
]

const router = new VueRouter({
  routes
})

export default router
