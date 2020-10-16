https://zhaomenghuan.js.org/blog/wechat-miniprogram-principle-analysis.html

微信小程序视图层是 WebView，逻辑层是 JS 引擎。三端的脚本执行环境以及用于渲染非原生组件的环境是各不相同的：

|     运行环境     |     逻辑层     |      渲染层       |
| :--------------: | :------------: | :---------------: |
|     Android      |       V8       | Chromium 定制内核 |
|       iOS        | JavaScriptCore |     WKWebView     |
| 小程序开发者工具 |      NWJS      |  Chrome WebView   |

## 双线程模型

小程序的渲染层和逻辑层分别由两个线程管理：渲染层的界面使用 WebView 进行渲染；逻辑层采用 JSCore 运行 JavaScript 代码。一个小程序存在多个界面，所以渲染层存在多个 WebView。这两个线程间的通信经由小程序 Native 侧中转，逻辑层发送网络请求也经由 Native 侧转发，小程序的通信模型下图所示。

![wechat-framework](images\wechat-framework.png)

## 整体架构

小程序的基础库是 JavaScript 编写的，基础库提供组件和 API，处理数据绑定、组件系统、事件系统、通信系统等一系列框架逻辑，可以被注入到渲染层和逻辑层运行。在渲染层可以用各类组件组建界面的元素，在逻辑层可以用各类 API 来处理各种逻辑。

![weapp-architecture](images\weapp-architecture.png)