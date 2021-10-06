### [WebView与APP交互实战记录](https://segmentfault.com/a/1190000018208609)

webviewJavascriptBridge

Android https://github.com/lzyzsd/JsBridge

IOS https://github.com/marcuswestin/WebViewJavascriptBridge

兼容写法

```JS
function isIOS() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

window.setupWebViewJavascriptBridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  } else if (isIOS()) {
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(.WebViewJavascriptBridge);
      },
      false
    );
  }
};
// 注册
window.setupWebViewJavascriptBridge(function (bridge) {
  bridge.registerHandler('stateChange', function (data, responseCallback) {
    console.log('收到APP请求stateChange事件，请求的数据是：', data);
    // 可以返回给app一个回调
    responseCallback('朕已经收到APP爱卿的请求了，且退下！');
  });
});
// 调用app方法
window.setupWebViewJavascriptBridge(function (bridge) {
  bridge.callHandler('playMusic', { musicId: 1 }, function (data) {
    console.log('app触发成功了，音乐正在播放。。。APP回调返回的数据：', data);
  });
});

// 这样子一般也行
window.WebViewJavascriptBridge.callHandler(
  'playMusic',
  { musicId: 1 },
  function (data) {
    console.log('app触发成功了，音乐正在播放。。。APP回调返回的数据：', data);
  }
);
```

