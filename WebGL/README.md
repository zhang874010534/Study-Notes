### WebGL可以做什么

#### 地图（高德地图）

#### VR(贝壳找房)

#### 物品展示(室内设计)

#### 城市规划

#### .........

### 开源框架

#### Three.js

JavaScript 3D WebGL库

#### Babylonjs

Web3D图形引擎

#### KickJS

Web的开源图形和游戏引警

#### ClayGL

构建可扩展的Web3D应用程序

#### PlayCanvas

网络游戏和3D图形引擎

#### WebGLStudio.js和Litescenejs

开源Web 3D图形编辑器和
创建器

#### Luma

Uber的3D WebGL可视化库

#### A-Frame

构建VR(虚拟现实)体验的Web框架

### 基础知识

#### 着色器

让开发者自己去编写一段程序，用来代替固定渲染管线，来处理图像的渲染。

##### 顶点着色器

描述顶点的特征

顶点是指二维三维空间中的一个点，可以理解为一个个坐标

##### 片元着色器

进行逐片元处理程序

片元其实已经很接近像素了，但是它还不是像素。 片元包含了比RGBA更多的信息，比如可能有深度值，法线，纹理坐标等等信息。 片元需要在通过一些测试（如深度测试）后才会最终成为像素。

### WebGL简单应用

#### 清空颜色缓冲区

[clearColor](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/clearColor)

```js
const canvas = document.querySelector("#canvasId")
const gl = canvas.getContext('webgl')
gl.clearColor(1.0,0.0,0.0,1.0)  // void gl.clearColor(red, green, blue, alpha);
gl.clear(gl.COLOR_BUFFER_BIT)
```

#### 绘制一个点

