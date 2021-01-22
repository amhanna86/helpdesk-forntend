import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store/store'

import signup from '@/components/auth/signup'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      beforeEnter (to, from, next) {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/login')
        }
      },
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        // Tables
        {
          name: 'Tickets',
          path: '/tickets',
          component: () => import('@/views/tickets/Tickets'),
        },
        {
          name: 'Ticket',
          path: '/ticket/:id',
          component: () => import('@/views/tickets/Ticket'),
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/components/auth/login'),
    },
    {
      name: 'Logout',
      path: '/logout',
      component: () => import('@/components/auth/logout'),
    },
    {
      name: 'Signup',
      path: '/signup',
      component: signup,
    },
  ],
})
