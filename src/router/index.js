import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/proxy'
  },
  {
    path: '/proxy',
    name: 'proxy',
    meta: {
      title: 'Proxy'
    },
    component: () => import('@/views/proxy')
  },
  {
    path: '/config',
    name: 'config',
    meta: {
      title: 'Config'
    },
    component: () => import('@/views/config')
  },
  {
    path: '/nginx',
    name: 'nginx',
    meta: {
      title: 'Nginx'
    },
    component: () => import('@/views/nginx')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router