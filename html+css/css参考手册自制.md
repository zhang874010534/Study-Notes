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

##### [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

> 指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容应该如何适应到其使用的高度和宽度确定的框

1. ##### video默认自带阴影可以用object-fit:cover 来让内容填满video框

##### [object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)

> 规定了[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容在其内容框中的位置

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

##### [mix-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)

> 属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合t

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

