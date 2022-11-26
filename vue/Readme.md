vue create 上下箭头不可用的时候

winpty vue.cmd create 项目名 这样子创建项目



### 初始化数据

this.form = this.$options.data().form

### Vue3

#### [vueuse](https://vueuse.org/) 常用hook整理

##### State

##### Elements

##### Browser

###### [useEventListener](https://vueuse.org/core/useEventListener/)

> 监听事件

###### [useFullscreen](https://vueuse.org/core/useFullscreen/)

> 全屏

###### [useImage](https://vueuse.org/core/useImage/)

> 可以等待图片加载完成才显示图片

##### Sensors

###### [onKeyStroke](https://vueuse.org/core/onKeyStroke/)

> 键盘事件

###### [onStartTyping](https://vueuse.org/core/onStartTyping/)

> 当用户开始在不可编辑的元素上输入时触发。 比如登录页可以直接输入账号，自动帮用户聚焦到账号input

##### Component

###### [useVirtualList](https://vueuse.org/core/useVirtualList/)

> 虚拟列表
