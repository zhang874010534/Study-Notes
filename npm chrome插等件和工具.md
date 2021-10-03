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

##### 开发环境

- vue-cli-plugin-element  用vue ui 安装     elementui的按需导入直接在一个文件夹里操作不用自己操作webpack

### React

- [echarts-for-react](https://github.com/hustcc/echarts-for-react)  一个简单的 echarts(v3.0 & v4.0) 的 react 封装。

- [react-router-dom](https://reactrouter.com/web/guides/quick-start)   DOM bindings for React Router

- [react-transition-group](https://github.com/reactjs/react-transition-group) 动画插件

- [redux](https://github.com/reduxjs/redux) a predictable state container for JavaScript apps

- [react-redux](https://github.com/reduxjs/react-redux) Official React bindings for redux. Performant and flexible.

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

### 通用

- [moment](https://momentjs.com/)  时间格式化工具

- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)  Node.js proxying made simple

- [lottie](https://airbnb.io/lottie/#/) json动效

- crypto-js  加密函数库

- `lodash` -- 工具库

- [mammoth](https://github.com/mwilliamson/mammoth.js) [示例](https://jstool.gitlab.io/zh-cn/demo/preview-ms-word-docx-document-in-browser/) 在网页中渲染 word 

- [normalize.css](https://www.npmjs.com/package/normalize.css) 让不同的浏览器在渲染网页元素的时候形式更统一

- [anime.js](https://github.com/juliangarnier/anime/) 动画库

- [mitt](https://github.com/developit/mitt) 事件的on off emit

- [eruda](https://github.com/liriliri/eruda) 移动端调试工具

  ```typescript
  <script type="text/javascript" src="//cdn.jsdelivr.net/npm/eruda"></script> 
  <script>eruda.init();</script>
  ```


- [js-audio-recorder](https://github.com/2fps/recorder) h5录音

  > h5录音调研 https://www.jianshu.com/p/2199939b629d

### CSS

- https://www.minimamente.com/css-infinite-photo-carousel/ 图片无限斜着滚动

### Node

- nodemon 自动重启

### Chrome

- [page-web-skeleton](https://juejin.cn/post/6937939181356187662#comment) 生成骨架屏

### 工具

- snipaste 截图工具
- [spy-debugger](https://github.com/wuchangming/spy-debugger) 一站式页面调试、抓包工具
- [Mobile debug](https://www.mobiledebug.com/) 自动安装证书 抓电脑里打开的东西的数据

