import { createRouter, createWebHashHistory } from 'vue-router'

const modules = import.meta.glob('@/views/**/**/**.vue')
const moduleKey = Object.keys(modules)
const moduleRoutes = moduleKey.map(key => {
  const arr = key.replace(/.vue/g, '').split('/')
  // const item = arr.at(-1)
  const item = arr[arr.length - 1]
  return {
    path: `/${item}`,
    name: item,
    component: modules[key]
  }
})
const routes = [
  ...moduleRoutes
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
