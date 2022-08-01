import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
let viewsRoutes = []
const routerContext = require.context('./module', false, /\.js$/)
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route)
  viewsRoutes = [
    ...viewsRoutes,
    ...(routerModule.default || routerModule)
  ]
})
const routes = [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: viewsRoutes
  },
]
const router = new VueRouter({
  routes
})

export default router
