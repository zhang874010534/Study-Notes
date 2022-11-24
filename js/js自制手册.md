#### [window.atob   window.btoa](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64)

> `atob()` 函数能够解码通过base-64编码的字符串数据。
>
> 相反地，`btoa()` 函数能够从二进制数据“字符串”创建一个base-64编码的ASCII字符串。

#### [atan2](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)(y,x)

> 返回正切值

#### Math.cos()

> 传入弧度 比如Math.PI 那就返回-1

#### Math.sin()

> 传入弧度 比如Math.PI 那就返回1.2246467991473532e-16   无限接近于0  。。。。。

#### [navigator.storage.estimate()](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/NavigatorStorage/storage)

> 了解您的浏览器使用的大约多少空间用于本地存储。

#### [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

> 接口定义了一些实用的方法来处理 URL 的查询字符串

#### [Node.contains()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)

> 返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。

#### [document.scrollingElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scrollingElement)

> 能自己识别文档的滚动元素， 其在PC端等于`document.documentElement`, 其在移动端等于`document.body`

#### [Element.scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

> 滚动元素的父容器，可以用来滚动到顶部

#### [Dom.scrollTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo)

> 滚动

```js
// 平滑滚动
window.scrollTo({
    top: 1000,
    left: 1000,
    behavior: "smooth"
});
```

#### [ToLocalString](https://blog.csdn.net/qq_42453950/article/details/88339163)

```js
const num = 2333333;
num.toLocaleString('zh', { style: 'decimal' });   //2,333,333
num.toLocaleString('zh', { style: 'percent' });   //233,333,300%


const num = 2333333;
num.toLocaleString('zh', { style: 'currency', currency: 'CNY' });    //￥2,333,333.00
num.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: 'code' });      //CNY2,333,333.00
num.toLocaleString('zh', { style: 'currency', currency: 'cny', currencyDisplay: 'name' });      //2,333,333.00人民币

const date = new Date();
date.toLocaleString('zh', { hour12: true });        //2018/4/4 下午6:57:36
date.toLocaleString('zh', { hour12: false });       //2018/4/4 18:57:36

```

### Element

#### [Element.closest()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest)

> **`Element.closest()`** 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 `null`。

```js
e.target.closest('.item').classList.add("current");
```

### Window

#### getComputedStyle

```js
// 拿到CSSStyleDeclaration上面有一个方法getPropertyValue获取属性
getComputedStyle(temp1).getPropertyValue('bottom')
```



