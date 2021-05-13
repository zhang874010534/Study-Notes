#### 解决图片拉伸问题

#### [border-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)

CSS属性允许在元素的边框上绘制图像

```css
border-image-source: url('./demo.png');
border-image-slice: 30 30 30 30 fill;
border-image-width: auto
```

**`border-image-slice`**属性会将图片分割为9个区域

区域 9 为中心区域（ middle region）。它在默认情况下会被丢弃，但如果设置了关键字`fill`，则会将其用作背景图像


![111](https://developer.mozilla.org/files/3814/border-image-slice.png)

