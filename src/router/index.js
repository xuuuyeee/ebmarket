import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'login'
  },
  {
    path: '/home',
    component: () => import('@/views/Home/Home.vue'),
    name: 'home',
    redirect: '/home/main',
    children: [
      {
        path: 'main',
        component: () => import('@/views/Main/Main.vue'),
        name: 'main'
      },
      {
        path: 'register',
        component: () => import('@/views/Register/Register.vue'),
        name: 'register'
      },
      {
        path: '/cart',
        component: () => import('@/views/ShopCraft/ShopCraft.vue'),
        name: 'cart'
      },
      {
        path: '/category/:sort',
        component: () => import('@/views/Category/Category.vue'),
        name: 'category',
      },
      {
        path: '/category/sub/:sort',
        component: () => import('@/views/Sup/Sup.vue'),
        name: 'sup'
      },
      {
        path: '/product/:sort',
        component: () => import('@/views/Product/Product.vue'),
        name: 'product'
      },
      {
        path: '/user',
        component: () => import('@/views/User/User.vue'),
        name: 'user'
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
