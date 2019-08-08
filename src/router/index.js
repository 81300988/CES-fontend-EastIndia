import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hello from '@/components/Hello'
import SearchPage from '@/components/SearchPage'
import PriceListpage from '@/components/PriceListpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/authors',
      name: 'Authors',
      component: Hello
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchPage
    },
    {
      path: '/pricelist',
      name: 'Pricelist',
      component: PriceListpage
    }
  ]
})
