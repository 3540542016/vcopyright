import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loginRegister',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/creator',
    name: '内容创作者',
    component: () => import('../views/users/creatorView.vue')
  },
  {
    path: '/auditor',
    name: '审核机构',
    component: () => import('../views/users/auditorView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
