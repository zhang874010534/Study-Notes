## **背景**

小程序webview 内嵌h5页面,需要jssdk调用微信的录音功能
需要授权的都要这么做

## **前端部分**

- 跳转的h5页面的域名要在小程序加白名单

- h5页面内调用jssdk，需要公众号内设置JS接口安全域名

  设置与开发 => 公众号设置 => 功能设置 => JS接口安全域名

### wx.config 授权

```js
import axios from '@/axios'

const jsSDKValidate = async (appidParams) => {
  // URL需要encodeURIComponent
  const url = encodeURIComponent(window.location.href.split('#')[0])
  const queryUrl = `${API_CONFIG.h5API}applet/wx/signature?url=${url}`
  const { status, data } = await axios.get(queryUrl)
  if (status === 100) {
    const { appId, timestamp, nonceStr, signature } = data
    window.wx.config({
      debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名
      jsApiList: [ // 必填，需要使用的JS接口列表
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'translateVoice',
        'getLocation',
        'chooseImage'
      ]
    })
    window.wx.ready(function () {
      console.log('jssdk ready')
    })
  }
}

// 判断是否是微信小程序环境
wx.miniProgram.getEnv((res) => {
  console.log(res.miniprogram) // true
})
```

### 调用例子

```js
wx.startRecord({
    success:function () {
        console.log('开始录音')
    },
    fail:function() {
        console.log("微信小程序录音失败回调");
    },
    cancel: function () {
        console.log('用户拒绝luyin授权录音');
    }
});
```

## **后端部分**

### 注意事项

> 一定要让后端缓存access_token和jsapi_ticket

> 调接口的ip要加到微信公众号ip白名单 自己调用就是自己的ip 服务器调用就是服务器的ip

### [获取Access token](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)

**接口调用请求说明**

> https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

**参数说明**

| 参数       | 是否必须 | 说明                                  |
| :--------- | :------- | :------------------------------------ |
| grant_type | 是       | 获取access_token填写client_credential |
| appid      | 是       | 公众号appId                           |
| secret     | 是       | 公众号appSecret                       |

### [**JS-SDK使用权限签名算法**](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62)

- **jsapi_ticket**

  [https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi](https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi)

- 时间戳timestamp

- 随机字符串noncestr

- 前端传过来的url（一般情况前端请求接口只用传url）

对4个参数进行sha1签名就能得到signature

## **自己调试不需要后端**

微信公众平台测试账号[https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

要在公众平台设置自己电脑的ip进白名单不然拿不到access_token

- 获取access_token [https://mp.weixin.qq.com/debug/cgi-bin/apiinfo]( https://mp.weixin.qq.com/debug/cgi-bin/apiinfo)

- 获取jsapi_ticket[https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi](https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi)

  把access_token放到url里的那个位置 会返回ticket

- 微信js 接口签名校验工具（可以拿他生成signature）[https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)

  nonceStr随机字符

  timestamp时间戳

  这俩看着传,和wx.config用的时候要一样

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

  

