### [css参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

##### [clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)

> 创建一个只有元素的部分区域可以显示的剪切区域

##### [background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)

> 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面

1. ##### border-box

   背景延伸至边框外沿（但是在边框下层）。

2. ##### padding-box


   背景延伸至内边距（[`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)）外沿。不会绘制到边框处。

3. ##### content-box


   背景被裁剪至内容区（content box）外沿。

4. ##### text


   背景被裁剪成文字的前景色。

##### [shape-outside](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside) [参考2](https://www.cnblogs.com/pssp/p/5903285.html)

> 定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装

**[steps ](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#steps())** [参考2](https://segmentfault.com/a/1190000007042048)   [animation steps.html](..\特效\animation steps.html)

> steps()是一个timing function，允许我们将动画或者过渡分割成段，而不是从一种状态持续到另一种状态的过渡。这个函数有两个参数——第一个参数是一个正值，指定我们希望动画分割的段数
>
>    animation: keyframe 2s  [steps](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#steps())(number_of_steps, direction)

##### [border-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)

> 可以拿来解决图片拉伸问题  CSS属性允许在元素的边框上绘制图像

##### [scroll-behavior](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)  chrome 61+

> 可以让滚动框实现平稳的滚动，而不是突兀的跳动

##### [Column layouts](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Layout_cookbook/Column_layouts) chrome 50+  column布局

##### [background-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-blend-mode) 

> 定义该元素的背景图片，以及背景色如何混合。

##### [background : repeating-radial-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/repeating-radial-gradient())

> 重复的径向渐变

##### [mix-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)

> 属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合

#### 单行文本省略

````CSS
{
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
````

#### 多行文本省略

````CSS
{
    width: 200px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
````

##### [scroll-behavior](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)  chrome 61+

> 可以让滚动框实现平稳的滚动，而不是突兀的跳动

#### 字体渐变

```css
{
    color: transparent;
    text-fill-color:transparent;// 网上的文章都用这个的 似乎不加只用color就够了
    background-clip: text;
    background: linear-gradient(to right, red, blue);
}
```

#### [text-orientation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-orientation)

>
> 设定行中字符的方向

#### [will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

> 通知浏览器哪些元素和属性将会改变
>
> GPU 硬件加速是需要新建图层的，而把该元素移动到新图层是个耗时操作，界面可能会闪一下，所以最好提前做。
>
> will-change 就是提前告诉浏览器在一开始就把元素放到新的图层，方便后面用 GPU 渲染的时候，不需要做图层的新建
>
> 如果你的页面在性能方面没什么问题，则不要添加 `will-change` 属性来榨取一丁点的速度

```css
will-change: auto
will-change: scroll-position
will-change: contents
will-change: transform
will-change: opacity
will-change: left, top

will-change: unset
will-change: initial
will-change: inherit
```

### Image

#### [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

> 指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容应该如何适应到其使用的高度和宽度确定的框

1. ##### video默认自带阴影可以用object-fit:cover 来让内容填满video框

#### [object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)

> 规定了[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容在其内容框中的位置

#### 优化点

- 始终在图像上设置宽度和高度属性：浏览器会在默认情况下会分配框并保留空间，后续图片资源加载完成后不需要回流。
  避免多次修改：例如我们需要修改一个 DOM 的 height/width/margin 三个属性，这时候我们可以通过 cssText 去修改，而不是通过 dom.style.height 去修改。

### [Scroll-snap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Scroll_Snap) 可实现整屏滚动

> CSS 的模块，它引入滚动捕捉位置，它强制滚动位置，即 滚动容器的 滚动端口 在滚动操作完成后可能结束的滚动位置。

#### [scroll-snap-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-type)

> 定义在滚动容器中的一个临时点（snap point）如何被严格的执行
>
> scroll-snap-type: y mandatory;
>
> scroll-snap-type: y proximity; 如果内容过长 mandatory 稍微往下一滑就自动到下一屏了 会导致内容看不完全就马上被划过了 所以要用这个

####  [scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)

> 设置对齐方式
>
> scroll-snap-align: start 下一屏的顶部贴合 父容器的顶部

#### [scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding)

> sets scroll padding on all sides of an element at once
>
> 就是加个padding 滚动就都会留出这么一个padding的距离

#### 使用

```html
<head>
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    main {
      scroll-snap-type: y mandatory;
      height: 100vh;
      overflow: scroll;
    }
    section {
      width: 100vw;
      height: 100vh;
      background-color: palegreen;
      scroll-snap-align: end;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>
<body>
  <main>
    <section>1</section>
    <section>2</section>
    <section>3</section>
    <section>4</section>
  </main>
</body>
```

### css引入图片

```css
background: url('~@/assets/img/xxx.png')
```

