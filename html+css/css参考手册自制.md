### [css参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

##### [clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)

> 创建一个只有元素的部分区域可以显示的剪切区域

##### [background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)

> 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

##### [shape-outside](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside) [参考2](https://www.cnblogs.com/pssp/p/5903285.html)

> 定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装

##### [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

> 指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容应该如何适应到其使用的高度和宽度确定的框

1. ##### video默认自带阴影可以用object-fit:cover 来让内容填满video框

**[steps ](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#steps())** [参考2](https://segmentfault.com/a/1190000007042048)   [animation steps.html](..\特效\animation steps.html)

> steps()是一个timing function，允许我们将动画或者过渡分割成段，而不是从一种状态持续到另一种状态的过渡。这个函数有两个参数——第一个参数是一个正值，指定我们希望动画分割的段数
>
>    animation: keyframe 2s  [steps](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#steps())(number_of_steps, direction)