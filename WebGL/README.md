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

#### [创建上下文](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext#the_webgl_context)

```js
const canvas = document.querySelector("#canvasId")
const gl = canvas.getContext('webgl')
```

#### 着色器

让开发者自己去编写一段程序，用来代替固定渲染管线，来处理图像的渲染。

##### 顶点着色器

描述顶点的特征

顶点是指二维三维空间中的一个点，可以理解为一个个坐标

```js
const vertex_Shader =  gl.createShader(gl.VERTEX_SHADER)
```

##### 片元着色器

进行逐片元处理程序

片元其实已经很接近像素了，但是它还不是像素。 片元包含了比RGBA更多的信息，比如可能有深度值，法线，纹理坐标等等信息。 片元需要在通过一些测试（如深度测试）后才会最终成为像素。

```js
const fragment_Shader =  gl.createShader(gl.FRAGMENT_SHADER)
```

#### attribute变量声明

> 只能在顶点着色器内使用

```js
存储限定符  类型 变量名    分号
attribute vec4 aPosition;

const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    void main () {
      gl_Position = aPosition;
      gl_PointSize = 10.0;
    }
  `
const aPosition = gl.getAttribLocation(program, 'aPosition') // 获取变量引用地址
gl.vertexAttrib4f(aPosition, 0.5, 0.5, 0, 1.0)//设置变量的值
```

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

```js
const canvas = document.querySelector("#canvasId")
const gl = canvas.getContext('webgl')

// 着色器
const VERTEX_SHADER_SOURCE = `
  void main () {
    gl_Position = vec4(0.0,0.0,0.0,1.0);
    gl_PointSize = 10.0;
  }
` // 顶点着色器

const FRAGMENT_SHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  ` // 片元着色器

// 创建着色器
const vertex_Shader =  gl.createShader(gl.VERTEX_SHADER)
const fragment_Shader =  gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vertex_Shader, VERTEX_SHADER_SOURCE)// 指定顶点着色器的源码
gl.shaderSource(fragment_Shader, FRAGMENT_SHADER_SOURCE)// 指定片元着色器的源码

// 编译着色器
gl.compileShader(vertex_Shader)
gl.compileShader(fragment_Shader)

// 创建一个程序对象
const program = gl.createProgram()

gl.attachShader(program, vertex_Shader)
gl.attachShader(program, fragment_Shader)

gl.linkProgram(program)

gl.useProgram(program)

// 执行绘制

// mode要绘制的图形是什 first从哪里开始 count使用几个顶点
gl.drawArrays(gl.POINTS, 0, 1)
```

#### [鼠标控制绘画](./案例/1.通过鼠标控制绘制)

```js
const points = []
ctx.onmousemove = (e) => {
    const clientX = e.clientX
    const clientY = e.clientY
    const domPosition = e.target.getBoundingClientRect()
    const domX = clientX - domPosition.left
    const domY = clientY - domPosition.top

    const halfWidth = ctx.offsetWidth / 2
    const halfHeight = ctx.offsetHeight / 2

    const x = (domX - halfWidth) / halfWidth
    const y = (halfHeight - domY) / halfHeight
    console.log(x,y)
    points.push({
        x,y
    })
    for (let i = 0; i < points.length; i++) {
        gl.vertexAttrib4f(aPosition, points[i].x, points[i].y, 0, 1.0)
        // mode要绘制的图形是什 first从哪里开始 count使用几个顶点
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}
```

