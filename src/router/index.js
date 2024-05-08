import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: '/', component: () => import('../components/main/Log.vue') },
        { path: 'log', component: () => import('../components/main/Log.vue') },
        { path: 'log-analytic', component: () => import('../components/main/LogAnalytics.vue') },
        { path: 'statistic', component: () => import('../components/main/Statistic.vue') },
        { path: 'config', component: () => import('../components/main/Config.vue')},
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
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to) => {

  const store = useUserStore()

  if (!store.isLogin && to.name !== 'login' && to.name !== 'signup') {
    store.setBackUrl(to.path)
    return '/login'
  }
})

export default router
