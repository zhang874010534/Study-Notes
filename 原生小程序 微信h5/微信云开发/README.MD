[微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

https://github.com/zhang874010534/wechat-cloudMiniprogram 仓库

## 云函数

云函数是一段运行在云端的代码，无需管理服务器，在开发工具内编写、一键上传部署即可运行后端代码。

小程序内提供了专门用于云函数调用的 API。开发者可以在云函数内使用 [`wx-server-sdk`](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/wx-server-sdk.html) 提供的 [`getWXContext`](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/utils/Cloud.getWXContext.html) 方法获取到每次调用的上下文（`appid`、`openid` 等），无需维护复杂的鉴权机制，即可获取天然可信任的用户登录态（`openid`）。

比如我们如下定义一个云函数，命名为 add ，功能是将传入的两个参数 a 和 b 相加：

```js
// index.js 是入口文件，云函数被调用时会执行该文件导出的 main 方法
// event 包含了调用端（小程序端）调用该函数时传过来的参数，同时还包含了可以通过 getWXContext 方法获取的用户登录态 `openId` 和小程序 `appId` 信息
const cloud = require('wx-server-sdk')
exports.main = async (event, context) => {
  let { userInfo, a, b} = event
  let { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  let sum = a + b

  return {
    OPENID,
    APPID,
    sum
  }
}
```

在开发者工具中上传部署云函数后，我们在小程序中可以这么调用：

> 除了部署云函数进行调用外，我们还支持[云函数本地调试](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/local-debug.html)，可以不用部署云函数即可测试

```js
wx.cloud.callFunction({
  // 需调用的云函数名
  name: 'add',
  // 传给云函数的参数
  data: {
    a: 12,
    b: 19,
  },
  // 成功回调
  complete: console.log
})
// 当然 promise 方式也是支持的
wx.cloud.callFunction({
  name: 'add',
  data: {
    a: 12,
    b: 19
  }
}).then(console.log)
```

> 云函数的请求参数 data 有大小限制（100K）

如需在云函数中操作数据库、管理云文件、调用其他云函数等操作，可使用官方提供的 npm 包 [`wx-server-sdk`](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-server-api/) 进行操作。

更多的云函数管理和 API，可以参考[云函数指引](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions.html)章节。

## 数据库

```js
// 1. 获取数据库引用
const db = wx.cloud.database()
// 2. 构造查询语句
// collection 方法获取一个集合的引用
// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
// get 方法会触发网络请求，往数据库取数据
db.collection('books').where({
  publishInfo: {
    country: 'United States'
  }
}).get({
  success: function(res) {
  // 输出 [{ "title": "The Catcher in the Rye", ... }]
  console.log(res)
 }
})
```