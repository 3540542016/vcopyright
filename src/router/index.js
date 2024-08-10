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
    name: 'creator',
    component: () => import('../views/users/creatorView.vue')
  },
  {
    path: '/auditor',
    name: 'auditor',
    component: () => import('../views/users/auditorView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to ,from ,next) =>{
  const token = localStorage.getItem("token")
  if(to.name != "loginRegister" && !token) next({ name: "loginRegister"})
  else next()
})
export default router
