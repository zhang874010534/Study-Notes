## [不同浏览器下 autoplay 的限制策略和方案的整理](https://segmentfault.com/a/1190000018273509)

https://developers.google.com/web/updates/2017/09/autoplay-policy-changes



思否文章

## PC 端浏览器的限制策略 和 应对方案

使用 Mac 在 PC 端测试的浏览器包括

- Chrome 浏览器
- Safari 浏览器
- Firefox 浏览器

### Chrome 浏览器

> Chrome-限制策略

内容参考自

- ***[https://developers.google.com...](https://link.segmentfault.com/?enc=wUHK%2FIyb%2Bq43VE3eBHn1RA%3D%3D.gtn9Pb%2BUpA3YoUUdLQxiSuozMjS7PxOwSVqP7wTUS8OxJjW3fUthYamrms%2BxKj5U0j7K5Bc7OaUseRZCgFQBd%2FbaK09HvJkIMP6r%2FIGQJug%3D)\***
- ***[https://github.com/gnipbao/ib...](https://link.segmentfault.com/?enc=lrCqBFpwRrHFujIQdWXzfw%3D%3D.JDIyqhUygMDH%2Fr2%2FB7oGHSdLt9AteorQTZ8LcpppE8YjXRM%2Bm7IB3aoQlZJSZKDv)\***

2018 年 4 月份发布的 Chrome 66 正式关掉了声音自动播放

- 静音自动播放总是允许的。
- 在下列情况下允许使用声音自动播放：
  - 用户已经与域进行了交互（点击，tap 等）。
  - 在桌面上，用户的媒**体参与指数阈值**(MEI)已被越过，这意味着用户以前播放带有声音的视频。
  - 在移动设备上，用户已将该网站添加到主屏幕。
  - 顶部框架可以将自动播放权限授予其 iframe 以允许自动播放声音。

MEI 是一个评估用户对于当前站点的媒体参与程度的指数，它取决于

```markdown
-   用户在媒体上停留时间超过了 7 秒以上
-   音频必须是展示出来，并且没有静音
-   与 video 之间有过交互
-   媒体的尺寸不小于 200x140.
```

> Chrome-应对方案

- 1.不要假设视频会播放，并且在视频不是真正播放时不要显示暂停按钮。
- 2.根据 promise 结果，判断当前媒体是否支持 autoplay

```javascript
var promise = document.querySelector("video").play();

if (promise !== undefined) {
    promise
        .catch(error => {
            // Auto-play was prevented
            // Show a UI element to let the user manually start playback
        })
        .then(() => {
            // Auto-play started
        });
}
```

- 3.如果不支持，有 3 个选择，
  - （1）静音自动播放，
  - （2）或者选择弹出 dialog 引导用户产生一次交互，在 event 回调里调用 play()
  - （3）提高 Chrome 浏览器的 MEI 指数

### Safari 浏览器

> Safari 的限制策略和应对方案

内容参考自
***[https://webkit.org/blog/7734/...](https://link.segmentfault.com/?enc=sPxdV4CVEOz1SrxRUmOZxw%3D%3D.TPLQot4DHdjVhoiMM0%2F9PQxIcFrYHBMonkOnnN4PzHvioy7PWJ2KdUvrQmHAwpwWaY8qsamLwcer16rD4dEL5fq%2BMBOqZUoZIv9DM0gbhQs%3D)\***

Safari 浏览器使用自动推理引擎来阻止绝大多数网站默认自动播放的媒体元素。

Safari11 允许用户通过「此网站的设置」选项，让用户控制哪些网站可以自动播放音视频

- 1.判断当前媒体是否支持 autoplay
- 2.如果不支持，有 3 个选择
  - 静音自动播放
  - 引导用户对浏览器设置为【允许自动播放】
  - 弹出 dialog 引导用户产生一次交互，在 event 回调里调用 play()

静音自动播放例子：

![clipboard.png](https://segmentfault.com/img/bVboPVe?w=1258&h=808)

弹出 dialog 引导用户产生一次交互的例子：
![clipboard.png](https://segmentfault.com/img/bVboPU1?w=1542&h=894)

引导用户对浏览器设置为【允许自动播放】的例子：

![clipboard.png](https://segmentfault.com/img/bVboPU8?w=1510&h=762)

![clipboard.png](https://segmentfault.com/img/bVboPVa?w=862&h=500)

### Firefox 浏览器

个人测试的结果是 Firefox 浏览器支持 autoplay

## 移动端浏览器的限制策略 和 应对方案

使用 Android 手机测试的浏览器包括以下

- Firefox / QQ 浏览器 / 钉钉
- 微信
- Chrome
- Safari
- UC浏览器

其中 Firefox / QQ 浏览器 / 钉钉 使用 video autoplay 的表现良好

> 微信的限制策略和应对方案

微信上实现自动播放需要用到一个 API WeixinJSBridge

它是在微信内置浏览器中有一个内置的 JS 对象,这个内置的 JS 对象就是 WeixinJSBridge. WeixinJSBridge 并不是 WebView 一打开就有了，客户端需要初始化这个对象，当这个对象准备好的时候，客户端会抛出事件 "WeixinJSBridgeReady"。因此，在调用 WeixinJSBridge 相关 api 时，需要做好 WeixinJSBridge 存在与否的判断.

```javascript
//监听 WeixinJSBridge 是否存在
if (
    typeof WeixinJSBridge == "object" &&
    typeof WeixinJSBridge.invoke == "function"
) {
    vedio.play();
} else {
    //监听客户端抛出事件"WeixinJSBridgeReady"
    if (document.addEventListener) {
        document.addEventListener(
            "WeixinJSBridgeReady",
            function() {
                vedio.play();
            },
            false
        );
    } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", function() {
            vedio.play();
        });
        document.attachEvent("onWeixinJSBridgeReady", function() {
            vedio.play();
        });
    }
}
```

> 移动端 Chrome 的限制和解决方案

- muted可以自动静音播放
- 引导用户做一次交互可以播放
- MEI值高的网站，可以自动播放

> 移动端 Safari 的限制和解决方案

- muted可以自动静音播放
- 引导用户做一次交互可以播放
- 引导用户对浏览器设置为【允许自动播放】

> 移动端 UC浏览器 的限制和解决方案

- 静音模式也无法自动播放
- 弹出dialog,引导用户做一次交互可以播放

## 音频的限制策略和应对方案

参考资料

***[https://segmentfault.com/a/11...](https://segmentfault.com/a/1190000003115198)\***

#### 音频元素

原生播放音频除了使用audio标签之外，还有另外一个API叫AudioContext，AudioContext接口表示由音频模块连接而成的音频处理图，每个模块对应一个AudioNode。AudioContext可以控制它所包含的节点的创建，以及音频处理、解码操作的执行。做任何事情之前都要先创建AudioContext对象，因为一切都发生在这个环境之中。

##### AudioContext播放声音

1. 先请求音频文件，放到ArrayBuffer里面，然后用AudioContext的API进行decode解码，解码完了再让它去play。

```javascript
function request (url) {
    return new Promise (resolve => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        // set response Type arraybuffer
        xhr.responseType = 'arraybuffer';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.response);
            }
        };
        xhr.send();
    });
}
```

1. 实例化AudioContext

```javascript
// Safari是使用webkit前缀
let context = new (window.AudioContext || window.webkitAudioContext)();
```

1. 解码播放

```javascript
function play (context, decodeBuffer) {
    let source = context.createBufferSource();
    source.buffer = decodeBuffer;
    source.connect(context.destination);
    // 从0s开始播放
    source.start(0);
}
// 请求音频数据
let audioMedia = await request(url);
// 进行decode和play
context.decodeAudioData(audioMedia, decode => play(context, decode));
```