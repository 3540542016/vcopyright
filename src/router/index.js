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
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
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
  },
   {
    path: '/auditor',
    name: 'auditor',
    component: () => import('../views/auditorView.vue')
  },
   {
    path: '/audited',
    name: 'audited',
    component: () => import('../views/auditedView.vue')
  },
   {
    path: '/createallwork',
    name: 'createallwork',
    component: () => import('../views/CreateAllworkView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
