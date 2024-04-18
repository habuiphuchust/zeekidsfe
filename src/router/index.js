import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {path: '/',  component: () => import('../components/main/Log.vue')},
        {path: 'log',  component: () => import('../components/main/Log.vue')},
        {path: 'statistic',  component: () => import('../components/main/Statistic.vue')},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
