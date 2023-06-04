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

##### drawArrays

- `gl.POINTS`: 绘制一系列点。
- `gl.LINE_STRIP`: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。
- `gl.LINE_LOOP`: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
- `gl.LINES`: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。
- `gl.TRIANGLE_STRIP`：绘制一个[三角带](https://en.wikipedia.org/wiki/Triangle_strip)。每增加一个点增加一个三角形，比如4个点就是2个三角形
- `gl.TRIANGLE_FAN`：绘制一个[三角扇](https://en.wikipedia.org/wiki/Triangle_fan)。 第一个点是中心，其他的点都围绕着它，第2个点和最后一个点是一样的就可以围成一个圈了
- `gl.TRIANGLES`: 绘制一系列三角形。每三个点作为顶点。

```js
gl.drawArrays(gl.POINTS, 0, 3)
```

#### 变量

##### attribute变量声明

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

##### uniform变量

```js
const FRAGMENT_SHADER_SOURCE = `
	precision mediump float // 中精度 mediump 高精度 highp 低精度 lowp
    uniform vec4 uColor;
    void main() {
      gl_FragColor = uColor;
    }
  ` // 片元着色器
const uColor = gl.getUniformLocation(program, 'uColor')
gl.uniform4f(uColor, 1, 0, 0, 1)

// 情况1 
const FRAGMENT_SHADER_SOURCE = `
	precision mediump float // 中精度 mediump 高精度 highp 低精度 lowp
    uniform float uColor;
    void main() {
      gl_FragColor = vec4(uColor, 0.0, 0.0, 1.0);
    }
  ` // 片元着色器
const uColor = gl.getUniformLocation(program, 'uColor')
gl.uniform1f(uColor, 1.0)

// 情况2
const FRAGMENT_SHADER_SOURCE = `
	precision mediump float // 中精度 mediump 高精度 highp 低精度 lowp
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor.r, uColor.g, uColor.b, 1.0);
    }
  ` // 片元着色器
const uColor = gl.getUniformLocation(program, 'uColor')
gl.uniform3f(uColor, 1.0, 0.0, 0.0, 1.0)
```

##### varying

可以将变量从顶点着色器传递到片元着色器，2边都需要声明同名的变量

```glsl
  const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    varying vec4 vColor;
    void main () {
      gl_Position = aPosition;
      vColor = aPosition;
    }
  ` // 顶点着色器

  const FRAGMENT_SHADER_SOURCE = `
    precision mediump float;
    varying vec4 vColor;
    void main() {
      gl_FragColor = vColor;
    }
  ` // 片元着色器
```



#### 类型化数组

在 webgl中，需要处理大量的相同类型数据，所以引入类型化数组，这样程序就可以预知到数组中的数据类型，提高性能

```js
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
])
```

#### 缓冲区对象

WebGL系统中的一块内存区域，可以一次性地向缓冲区对象中填充大量的顶点数据，然后将这些数据保存在其中，供顶点着色器使用

```js
const buffer = gl.createBuffer(); // 缓存区对象

gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // 将buffer绑定到WebGL上
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW) // 将顶点数据写入到缓存区对象里  gl.STATIC_DRAW 写入一次多次绘制

const BYTES = points.BYTES_PER_ELEMENT // 每个元素所占用的字节数
// index attribute 变量的存储位置
// size 指定每个顶点所使用数据的个数
// type 指定数据格式
// normalized 表示是否将数据归一化到 [0,1] [-1,1] 这个区间
// stride 两个相邻顶点之间的字节数
// offset 数据偏移量
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 3, 0) // 告诉显卡从当前绑定的缓冲区（bindBuffer() 指定的缓冲区）中读取顶点数据

gl.enableVertexAttribArray(aPosition) // 激活

gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, BYTES * 3, BYTES * 2) // 告诉显卡从当前绑定的缓冲区（bindBuffer() 指定的缓冲区）中读取顶点数据

gl.enableVertexAttribArray(aPointSize)

// gl.vertexAttrib4f(aPosition, 0, 0 , 0, 1.0)
// mode要绘制的图形是什 first从哪里开始 count使用几个顶点
gl.uniform4f(uColor, 0.5, 0.5 , 0, 1.0)

gl.drawArrays(gl.POINTS, 0, 3)
```

#### 纹理对象

纹理对象主要用于存储纹理图像数据

[案例](./案例/多图形绘制和动画/11.通过纹理给图形添加背景图.html)

```js
const img = new Image()
img.onload = () => {
    const texture = gl.createTexture()

    // 翻转y轴
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

    // 开启一个纹理单元
    gl.activeTexture(gl.TEXTURE0)

    // 绑定纹理对象
    gl.bindTexture( gl.TEXTURE_2D ,texture)

    // 处理放大缩小的逻辑
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

    // 横向 纵向 平铺的方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img )

    gl.uniform1i(uSampler, 0)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0 , 4)
}
img.src = './heizi.png'
```

### OpenGLES语言

#### 语言基础

```glsl
void main () {
    float f = 1.0;
    int i = 10;
    bool b = true;
}
```

```glsl
void main () {
    float f = float(10);
    int i = int(10.0);
    bool b = bool(1);
}
```

#### 矢量

vec2、vec3、vec4 具有 2，3，4 个浮点数元素的矢量

ivec2、ivec3、ivec4 具有 2，3，4 个整型元素的矢量

bvec2、bvec3、bvec4 具有 2，3, 4个布尔值元素的矢量

##### 赋值

需要通过 构造函数 来进行赋值

```glsl
vec4 position = vec4(0.1,0.2,0.3,1.0); // vec4 就是矢量的构造函数
```

##### 访问矢量里的分量

x,y z,w 访问顶点坐标的分量

s,t,p,q 访问纹理坐标分量

```glsl
vec4 position = vec4(0.1,0.2,0.3,1.0); // vec4 就是矢量的构造函数

position.x // 0.1
position.y // 0.2
position.z // 0.3
position.xy // vec2(0,1, 0.2)
position.yx // vec2(0,2, 0.1)
position.zyx // vec3(0.3, 0.2, 0.1)
```

#### 矩阵

mat2、mat3、mat4 2 * 2，3 * 3，4 * 4的浮点数元素矩阵

```glsl
// 矩阵参数是列主序，竖着排列的
mat4 m = mat4(
	1.0, 5.0, 9.0,  13.0,
    2.0, 6.0, 10.0, 14.0,
    3.0, 7.0, 11.0, 15.0,
    4.0, 8.0, 12.0, 16.0,
)
```

#### 纹理取样器

取样器有两种: sampler2D 和 samplerCube

#### 内置函数

##### 角度函数

- radians 角度转弧度
- degress 弧度转角度

##### 三角函数

- sin 正弦
- cos 余弦
- tan 正切
- asin 反正切
- acos 反余弦
- atan 反正切

##### 指数函数

- pow 次方
- exp 自然质数
- log 对数
- sqrt 开平方
- invertesqrt 开平方的倒数

##### 通用函数

- 绝对函数
- min 最小值
- max 最大值
- mod 取余数
- sign 取符号
- floor 向下取整
- ceil 向上取整
- clamp 限定范围
- fract 获取小数部分

##### 几何函数

- length(x) 计算向量 x 的长度
- distance(x, y) 计算向量 xy 之间的距离
- dot(x,y) 计算向量 xy 的点积
- cross(x, y) 计算向量 xy 的差积
- normalize(x) 返回方向同x, 长度为1的向量

#### 存储限定词

##### const

用于定义常量，表示变量的值在定义后不能被修改

##### attribute

用于声明输入变量，在顶点着色器中使用，表示当前变量的值从JavaScript传入到WebGL中。比如说可以来表示点的位置

##### uniform

用于声明全局变量，在顶点着色器和片元着色器中使用，表示当前变量的值在WebGL中保持不变，可以在多个渲染调用中共享。比如可以用来存储所有顶点的矩阵数据

##### varying

用于声明输出变量，在顶点着色器和片元着色器之间使用，表示当前变量的值从顶点着色器传递到片元着色器。

##### 精度限定

作用是提升运行效率，削减内存开支

可以单独针对某个变量声明精度

劣势:会出现精度歧义，也不利于后期维护

精度枚举 highp 高精度 mediump 中精度 lowp 低精度

```glsl
precision mediump float f;
```



### WebGL简单应用

#### 清空颜色

#### 缓冲区

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
        gl.uniform4f(uColor, points[i].x, points[i].y , 0, 1.0)
        // mode要绘制的图形是什 first从哪里开始 count使用几个顶点
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}
```

 
