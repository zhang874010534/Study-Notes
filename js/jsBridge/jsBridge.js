// 1号版本
'use strict';
(function (window) {
  var ChaosJSBridge = function () {
    var _this = this;
    _this.registerObj = {};
    _this.constructor = (function () {
      _this.init();
    })();
  };
  ChaosJSBridge.prototype = {
    init: function () {
      var that = this;
      if (window.WebViewJavascriptBridge) {
        that.ready();
      } else {
        //ios
        if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(that.ready);
        }
        if (
          !window.__wxjs_environment ||
          window.__wxjs_environment !== 'miniprogram'
        ) {
          window.WVJBCallbacks = [that.ready];
          var WVJBIframe = document.createElement('iframe');
          var doc = document.documentElement;
          WVJBIframe.style.display = 'none';
          WVJBIframe.src = 'https://__bridge_loaded__';
          doc.appendChild(WVJBIframe);
          setTimeout(function () {
            doc.removeChild(WVJBIframe);
          }, 0);
        }
        //android
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function () {
            that.ready();
          },
          false
        );
      }
    },
    ready: function () {
      try {
        this.initRegister();
      } catch (e) {}
    },
    initRegister: function () {
      for (var key in this.registerObj) {
        this.register(key, this.registerObj[key]);
      }
    },
    register: function (handlerName, callback) {
      if (this.registerObj.hasOwnProperty(handlerName)) {
        delete this.registerObj[handlerName];
      }
      try {
        WebViewJavascriptBridge.registerHandler(
          handlerName,
          function (res, responseCallback) {
            var result = {};
            try {
              result = JSON.parse(res);
            } catch (e) {
              result = {
                state: -1,
                message: 'error',
                data: e
              };
            }
            callback(result, responseCallback);
          }
        );
      } catch (e) {
        this.registerObj[handlerName] = callback;
      }
    },
    call: function (handler, param, callback) {
      try {
        return WebViewJavascriptBridge.callHandler(
          handler,
          param,
          function (res) {
            var result = {};
            try {
              result = JSON.parse(res);
            } catch (e) {
              result = {
                state: -1,
                message: 'error',
                data: e
              };
            }
            callback(result);
          }
        );
      } catch (e) {
        callback({
          state: -1,
          message: '请在app内打开网页',
          data: []
        });
      }
    }
  };
  window.ChaosJSBridge = new ChaosJSBridge();
})(window);

// 2号版本
/* 创建wk的承载容器begin */
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  } else {
    window.document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(window.WebViewJavascriptBridge);
      },
      false
    );
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

// 不知道有啥用
var count = 0;
var jsbridge = function (bridge) {
  if (!bridge) {
    setTimeout(function () {
      jsbridge(bridge);
      count++;
    }, 50);
  } else {
    if (count <= 5) {
      // 初始化
      if (bridge.init) {
        bridge.init();
      }
      window.bridge = bridge;
    } else {
      return false;
    }
  }
};
setupWebViewJavascriptBridge(jsbridge);

// 3号版本
// 检测是不是ios
function isIOS() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

// 原生方法注册
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
        callback(window.WebViewJavascriptBridge);
      },
      false
    );
  }
};
window.setupWebViewJavascriptBridge(function (bridge) {
  bridge.registerHandler('stateChange', function (data, responseCallback) {
    console.log('收到APP请求stateChange事件，请求的数据是：', data);
    // 可以返回给app一个回调
    responseCallback('朕已经收到APP爱卿的请求了，且退下！');
  });
});
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
