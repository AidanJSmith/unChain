import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
