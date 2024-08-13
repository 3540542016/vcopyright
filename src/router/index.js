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
      path: '/creatorhome',
      name: 'creatorhome',
      component: () => import('../views/CreatorHomeView.vue')
    }
  ,
  {
      path: '/creatework',
      name: 'creatework',
      component: () => import('../views/CreateWorkView.vue')
  }
  ,
  {
      path: '/creatormanagement',
      name: 'creatormanagement',
      component: () => import('../views/CreatorManagementView.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
