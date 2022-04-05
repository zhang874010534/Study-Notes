安卓fixed到底部 ios dom.scroll到底部

https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll

```javascript
window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
```

等ios 兼容性起来了可以用这个
https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport
获取ios键盘弹起后的可视界面的高度

### [可能这些是你想要的H5软键盘兼容方案](https://segmentfault.com/a/1190000018959389)