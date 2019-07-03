import Vue from 'vue'
import Router from 'vue-router'
import brief from '../view/brief'
import home from '../view/home.vue'
import detail from '../view/detail'
import login from '../view/login'
import bag from '../view/bag'
import order from '../view/orders'
import adminOrder from '../view/admin/adminOrder'
import adminBook from '../view/admin/adminBook'
import adminUser from '../view/admin/adminUser'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: home
    },
    {
      path: '/brief',
      component: brief
    },
    {
      path: '/detail',
      component: detail
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/bag',
      component: bag
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/adminOrder',
      component: adminOrder
    },
    {
      path: '/adminUser',
      component: adminUser
    },
    {
      path: '/adminBook',
      component: adminBook
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
