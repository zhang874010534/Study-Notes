### Vue

> 可以在vue ui 里直接选运行依赖安装 main.js里引用并use

- [vue-table-with-tree-grid](https://github.com/MisterTaki/vue-table-with-tree-grid)  A table (with tree-grid) component for Vue.js 2.0

- [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)  富文本编辑器 editor component

- [nprogress](https://github.com/rstacruz/nprogress) 顶部进度条 slim progress bars

- [vue-lazyload](https://www.npmjs.com/package/vue-lazyload) 图片懒加载

- [vue-awesome-swiper](https://github.surmon.me/vue-awesome-swiper) 轮播图

- vue-cli-plugin-element    vuecli插件 可以按需导入elementui组件

- [qrcode](https://www.npmjs.com/package/qrcode) 将文本转换成base64的二维码图片

- [vue-infinite-scroll](https://www.npmjs.com/package/vue-infinite-scroll) 滚动加载  滚动的时候执行一个方法

- vue-content-loader 骨架屏 配合Intersection Observer api

  > https://skeletonreact.com/ 初略的绘制骨架屏 放到项目里再具体调整

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) 长列表组件 

  > 局部加载解决列表过长的问题
  
- [vue-clamp](https://github.com/Justineo/vue-clamp) 多行文本截断 

- [vue-draggable](https://github.com/SortableJS/Vue.Draggable) [中文文档](https://www.itxst.com/vue-draggable/vnqb7fey.html) [demo](https://sortablejs.github.io/Vue.Draggable/#/transition-example-2)  [知乎参数中文版](https://juejin.cn/post/6844904150350692366)

- [vue-seamless-scroll](https://chenxuan0000.github.io/vue-seamless-scroll/) vue无缝滚动

- [vue-print-nb](https://www.npmjs.com/package/vue-print-nb) 打印 vue3-print-nb

- [el-table-infinite-scroll](https://www.npmjs.com/package/el-table-infinite-scroll) element ui 虚拟列表

##### 开发环境

- vue-cli-plugin-element  用vue ui 安装     elementui的按需导入直接在一个文件夹里操作不用自己操作webpack

### React

- [echarts-for-react](https://github.com/hustcc/echarts-for-react)  一个简单的 echarts(v3.0 & v4.0) 的 react 封装。

- [react-router-dom](https://reactrouter.com/web/guides/quick-start)   DOM bindings for React Router

- [react-transition-group](https://github.com/reactjs/react-transition-group) 动画插件

- [redux](https://github.com/reduxjs/redux) a predictable state container for JavaScript apps

- [react-redux](https://github.com/reduxjs/react-redux) Official React bindings for redux. Performant and flexible.

- [redux toolkit](https://redux-toolkit.js.org/) 高效的redux开发

- [redux-thunk](https://github.com/reduxjs/redux-thunk) lets you write async logic that interacts with the store.

- [redux-saga](https://github.com/redux-saga/redux-saga) is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

- [immutable](https://github.com/immutable-js/immutable-js)  [docs](https://immutable-js.github.io/immutable-js/docs/#/) Immutable data cannot be changed once created  
  - [fromjs](https://immutable-js.github.io/immutable-js/docs/#/fromJS)  Deeply converts plain JS objects and arrays to Immutable Maps and Lists.
  - [getIn](https://immutable-js.github.io/immutable-js/docs/#/getIn)    console.log(nested2.getIn([ 'a', 'b', 'd' ])); 
  - [merge](https://immutable-js.github.io/immutable-js/docs/#/merge) Returns a copy of the collection with the remaining collections merged in.
  
- [redux-immutable](https://github.com/gajus/redux-immutable)  is used to create an equivalent function of Redux combineReducers that works with immutable.js state 就是最外层的state希望让他也变成immutable对象

- [react-virtualized ](https://github.com/bvaughn/react-virtualized)长列表组件

- [typescript-plugin-css-modules ](https://github.com/mrmckeb/typescript-plugin-css-modules) 安装到dev，写react的css的时候有代码提示

  tsconfig.json文件种

  ```
  {
   "compilerOptions": {
    "plugins": [{ "name": "typescript-plugin-css-modules"}]
   }
  }
  ```

  vscode 的 setting.json 设置：

  ```
  "typescript.tsserver.pluginPaths": ["typescript-plugin-css-modules"]
  ```

- [react-i18next](https://react.i18next.com/guides/quick-start) react的i18n

- [react-photo-view](https://github.com/MinJieLiu/react-photo-view) react图片预览

- [react-reveal](https://github.com/rnosov/react-reveal) 适一个用于 React 的高性能动画库。它占用空间小，专门为 ES6 中的 React 编写。可用于创建各种炫酷的滚动效果显示。

- [classnames](https://www.npmjs.com/package/classnames) 处理类名 vue自带这种功能

- [immer](https://immerjs.github.io/immer/) 更方便的方式处理不可变状态

  ```js
  import {produce} from "immer";
  const [baseState, setBaseState] = useState([
    {
      title: "Learn TypeScript",
      done: true
    },
    {
      title: "Try Immer",
      done: false
    }
  ])
  setBaseState((prevState) => produce(prevState, draft => {
    draft[1].done = true
  }))
  ```

### 通用

- [moment](https://momentjs.com/)  时间格式化工具

- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)  Node.js proxying made simple

- [lottie](https://airbnb.io/lottie/#/) json动效

- crypto-js  加密函数库

- `lodash` -- 工具库

- [mammoth](https://github.com/mwilliamson/mammoth.js) [示例](https://jstool.gitlab.io/zh-cn/demo/preview-ms-word-docx-document-in-browser/) 在网页中渲染 word 

- [normalize.css](https://www.npmjs.com/package/normalize.css) 让不同的浏览器在渲染网页元素的时候形式更统一

- [anime.js](https://github.com/juliangarnier/anime/) 动画库

- **[tween.js ](https://github.com/tweenjs/tween.js)** 动画库

- [mitt](https://github.com/developit/mitt) 事件的on off emit

- [eruda](https://github.com/liriliri/eruda) 移动端调试工具

  ```typescript
  <script type="text/javascript" src="//unpkg.zhimg.com/eruda"></script> 
  <script>eruda.init();</script>
  <script
    if(window.location.hostname == 'github.com') {
      eruda.init();
    }
  </script>
  <% if (process.env.NODE_ENV === 'development') { %>
      <script>eruda.init();</script>
    <% } %>
  ```


- [js-audio-recorder](https://github.com/2fps/recorder) h5录音

  > h5录音调研 https://www.jianshu.com/p/2199939b629d

- [Recorder](https://github.com/xiangyuecn/Recorder) 前端录音

- [rrweb](https://github.com/rrweb-io/rrweb) 前端录制和回放用户操作

- [whimsical](https://whimsical.com/the-beginning-86qy7io4XjdZptgDBuaCzx)  前端流程图

- https://madewith.cn/vuejs  vue和react 一堆实用案例

- [compressor.](https://github.com/fengyuanchen/compressorjs) 图片压缩 方向修正（还没用过）

- [grade](https://github.com/benhowdle89/grade) 一个基于图像中的前2种主要颜色生成互补渐变背景的库

- [Sortable](https://github.com/SortableJS/Sortable) 功能强大的JavaScript 拖拽库

- [wow.js](https://github.com/graingert/WOW/) 滚动时显示动画，和animate.css结合

- [Scroll Reveal](https://scrollrevealjs.org/) 零依赖，为 web 和移动浏览器提供了简单的滚动动画，以动画的方式显示滚动中的内容

- [better-scroll](https://github.com/ustbhuangyi/better-scroll)  重点解决移动端（已支持 PC）各种滚动场景需求的插件

- [GreenSock JS](https://greensock.com/) 一个JavaScript动画库，用于创建高性能、零依赖、跨浏览器动画，已在超过400万个网站上使用, 并且可以在React、Vue、Angular项目中使用

- [mathjs](https://github.com/josdejong/mathjs) 精度问题  [掘金文章](https://juejin.cn/post/6935722510491222029)

  ```js
    const ans = math.add(0.1, 0.2)     //  0.30000000000000004
    console.log(math.format(ans, {precision: 14})) // '0.3'
  ```

- [js-cookie](https://www.npmjs.com/package/js-cookie) 简单操作cookie的库

- [js-image-compressor](https://www.npmjs.com/package/js-image-compressor) 图片压缩库

- [driver.js](https://www.npmjs.com/package/driver.js) 交互引导工具库s

  > [demo](https://kamranahmed.info/driver.js/)

- [qs](https://www.npmjs.com/package/qs) 字符串parse和字符串stringify

- [d6](https://github.com/antvis/g6)  关系数据可视化引擎与图分析工具

- [countUp](https://github.com/inorganik/CountUp.js) 数字增长动画

### CSS

- https://www.minimamente.com/css-infinite-photo-carousel/ 图片无限斜着滚动

### Node

- nodemon 自动重启

- [rimraf](https://www.npmjs.com/package/rimraf) 删除文件

  ```js
    "scripts": {
      "build:core": "vue-cli-service build --target lib --name index --no-clean lib/index.tsx", 
      "build:theme": "vue-cli-service build --target lib --name theme-default/index --no-clean lib/theme-default/index.tsx", 
      "build": "rimraf dist && npm run build:core && npm run build:theme",
    }, 
  ```

  

### Chrome

- [page-web-skeleton](https://juejin.cn/post/6937939181356187662#comment) 生成骨架屏

### 工具

- snipaste 截图工具
- [spy-debugger](https://github.com/wuchangming/spy-debugger) 一站式页面调试、抓包工具
- [Mobile debug](https://www.mobiledebug.com/) 自动安装证书 抓电脑里打开的东西的数据
- [shield.io](https://shields.io/) ![followers](https://img.shields.io/github/followers/zhang874010534?style=social)
- [jwt.io](https://jwt.io/) 查看token所对应的信息

### Webpack

- webpack-bundle-analyzer

  https://blog.csdn.net/ypeusksk/article/details/88192385

  webpack.config.js：

  ```js
  
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  module.exports = {
      plugins:[ new BundleAnalyzerPlugin() ]
  }
  
  
  ```

  vue.config.js

  ```js
  package.json
   "analyzer": "use_analyzer=true npm run serve"
  
  module.exports = {
    chainWebpack: config => {
      if (process.env.use_analyzer) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }
    }
  }
  ```


### package.json

[npm script使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

```js

{
  "name": "foo", 
  "version": "1.0.0",
  "private": false,
  "scripts": {
    "build:core": "vue-cli-service build --target lib --name index",
    "build": "rimraf dist && npm run build:core",
    "prepublishOnly": "npm run build" // publish之前
  },
  "publishConfig": { // 提交源
      "registry": "https://registry.npmjs.org"
  },
  "files": [ // 发布的文件
      "dist"
  ],
  "main": "dist/index.common.js" ,//import的那个文件
}
```

### 预览word，ppt等

> https://juejin.cn/post/7071598747519549454

| 文档格式           | 老的开源组件                 | 替代开源组件                         |
| ------------------ | ---------------------------- | ------------------------------------ |
| word（docx）       | mammoth                      | docx-preview(npm)                    |
| powerpoint（pptx） | pptxjs                       | pptxjs改造开发                       |
| excel（xlsx）      | sheetjs、handsontable        | exceljs(npm)、handsontable(npm)(npm) |
| pdf（pdf）         | pdfjs                        | pdfjs(npm)                           |
| 图片               | jquery.verySimpleImageViewer | v-viewer(npm)                        |

### 组件库

#### [storybook](https://storybook.js.org/docs/vue/get-started/introduction)
