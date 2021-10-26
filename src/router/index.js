import { createRouter, createWebHistory } from 'vue-router'
import Authorize from '../views/Authorize.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    ///redirect
    path: '/',
    redirect: '/authorize'
  },
  {
    path: '/authorize',
    name: 'Authorize',
    component: Authorize
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
