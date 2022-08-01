import { createRouter, createWebHashHistory } from 'vue-router'
import orderHome from 'views/workOrder/orderHome.vue'
import userHome from 'views/userOrder/userHome.vue'

const workOrderFiles = import.meta.glob('./module/workOrder.ts')
const userOrderFiles = import.meta.glob('./module/userOrder.ts')

const getRoutes = async files => {
  let routes = []
  for (const path in files) {
    await files[path]().then(res => {
      Object.keys(res).forEach(item => {
        routes = routes.concat(res[item])
      })
    })
  }
  return routes
}
/*
 *  module子文件， 已全部导入，不要重复导入path
 */
export default async () => {
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/orderHome',
        name: 'orderHome',
        component: orderHome,
        children: await getRoutes(workOrderFiles),
      },
      {
        path: '/userHome',
        name: 'userHome',
        component: userHome,
        children: await getRoutes(userOrderFiles),
      },
    ],
  })

  router.beforeEach(to => {
    document.title = <string>to.meta.title || 'vite-h5'
  })

  return router
}
