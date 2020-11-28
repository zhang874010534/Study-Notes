https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

先看一下文档

##### 注意事项

- vue（是什么都可以）的话，可以在public的index.html里引入jweixin.js

- config接口注入权限验证配置这步操作，就是前端请求后端的一个接口拿到数据，然后塞进去

  比如window.wx.config({}) 传进去，然后在window.wx.ready(function(){})里面调用微信的接口

  ```js
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名
    jsApiList: [] // 必填，需要使用的JS接口列表
  });
  ```

- 之后可以在util文件夹的util.js里写一个方法，这个方法比如想要打开微信的分享功能，自定义分享出去的链接以及图片和描述等信息，然后想要了就引入这个util文件，使用里面的方法，往wx.ready里面塞想要的操作（就是封装啦）

  ```js
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({ 
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      success: function () {
        // 设置成功
      }
    })
  }); 
  ```

  

