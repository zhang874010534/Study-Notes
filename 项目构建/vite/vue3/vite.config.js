import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import eslintPlugin from 'vite-plugin-eslint' //导入包
const resolve = (dir) => path.join(__dirname, dir)
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
const isDevelopment = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  base: isDevelopment ? '/' : '/nis-query/',
  // build: {
  //   target: "esnext"
  // },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    legacy({
      targets: ['defaults', 'ie >= 11', 'chrome 80'],  //需要兼容的目标列表，可以设置多个
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    }
  },
  server: {
    // 配置前端服务地址和端口
    //服务器主机名
    host: "127.0.0.1",
    //端口号
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open: true,
    //自定义代理规则
    proxy: {
      "/api-": {
        target: "http://192.168.1.111:8000/", //要代理的本地api地址，也可以换成线上测试地址
        changeOrigin: true, //跨域
      }
    }
  }
})
