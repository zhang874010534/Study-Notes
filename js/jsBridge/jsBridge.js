'use strict';
(function(window) {
    var ChaosJSBridge = function() {
        var _this = this;
        _this.registerObj = {};
        _this.constructor = function() {
            _this.init();
        }();
    };
    ChaosJSBridge.prototype = {
        init: function() {
            var that = this
            if (window.WebViewJavascriptBridge) {
                that.ready();
            } else {
                //ios
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(that.ready); }
                if(!window.__wxjs_environment || window.__wxjs_environment !== 'miniprogram'){
                    window.WVJBCallbacks = [that.ready];
                    var WVJBIframe = document.createElement('iframe');
                    var doc = document.documentElement
                    WVJBIframe.style.display = 'none';
                    WVJBIframe.src = 'https://__bridge_loaded__';
                    doc.appendChild(WVJBIframe);
                    setTimeout(function() { doc.removeChild(WVJBIframe) }, 0)
                }
                //android
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    that.ready();
                }, false);
            }
        },
        ready: function() {
            try {
                this.initRegister()
            } catch (e) {}
        },
        initRegister: function() {
            for(var key in this.registerObj){
                this.register(key, this.registerObj[key])
            }
        },
        register: function (handlerName, callback) {
            if(this.registerObj.hasOwnProperty(handlerName)) {
                delete this.registerObj[handlerName]
            }
            try {
                WebViewJavascriptBridge.registerHandler(handlerName, function(res, responseCallback) {
                    var result = {}
                    try {
                        result = JSON.parse(res)
                    } catch (e) {
                        result = {
                            state: -1,
                            message: 'error',
                            data: e,
                        }
                    }
                    callback(result, responseCallback)
                })
            } catch (e) {
                this.registerObj[handlerName] = callback
            }
        },
        call: function(handler, param, callback) {
            try {
                return WebViewJavascriptBridge.callHandler(handler, param, function(res) {
                    var result = {}
                    try {
                        result = JSON.parse(res)
                    } catch (e) {
                        result = {
                            state: -1,
                            message: 'error',
                            data: e,
                        }
                    }
                    callback(result)
                });
            } catch (e) {
                callback({
                    state: -1,
                    message: '请在app内打开网页',
                    data: [],
                })
            }
        },
        
    };
    window.ChaosJSBridge = new ChaosJSBridge();
})(window);