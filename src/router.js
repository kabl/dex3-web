import Vue from 'vue'
import Router from 'vue-router'
import CreateOrder from './views/CreateOrder.vue'
import FillOrder from './views/FillOrder.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'createOrder',
      component: CreateOrder
    },
    {
      path: '/fill-order',
      name: 'fillOrder',
      component: FillOrder
    },
  ]
})
