import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/index/Home.vue'
import Home from '@/views/Home.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "parser-example" */ '@/components/parser/example/my.vue'),
  },
  {
    path: '/parser',
    name: 'parser',
    component: () => import(/* webpackChunkName: "parser-example" */ '@/components/parser/example/Index.vue'),
  },
  {
    path: '/tinymce',
    name: 'tinymce',
    component: () => import(/* webpackChunkName: "tinymce-example" */ '@/components/tinymce/example/Index.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
