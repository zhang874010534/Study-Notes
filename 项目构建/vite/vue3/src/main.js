import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from "pinia"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@antv/s2-vue/dist/style.min.css";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(createPinia())
app.mount('#app')
