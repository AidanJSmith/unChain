import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import Market from '@/pages/MarketDetails'
import Subcontracting from '@/pages/Subcontracting'

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
    },
    {
      path: '/market/:id',
      name: 'MarketDetails',
      component: Market
    },
    {
      path: '/subcontracting',
      name: 'Subcontracting',
      component: Subcontracting
    }
  ]
})
