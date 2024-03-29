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

#### 光照

##### 点光源

点光源光线: 一个点向周围发出的光，如灯泡、火焰等

定义一个点光源需要光源的位置、光线方向以及颜色

##### 平行光

平行光:可以看成是无限远处的光源发出的光，如太阳光

因为离光源的位置特别远，所以到达被照物体时可以认为光线是平行的

只需要光照方向和光照颜色

##### 环境光

环境光:也就是间接光，是指光源发出后，经过其他物体各种发射然后照到物体表面上的光线

环境光的强度差距非常小，没有必要精确计算光线强度

环境光是均匀照射到物体表面的，只需要定义**光照颜色**

##### 环境反射 

环境反射:环境反射是针对环境光而言的，在环境反射中，环境光照射物体是各方面均匀、强度相等的，反射的方向就是入射光的反方

最终物体的颜色只跟入射光颜色和基底色有关

**<环境反射光颜色>=<入射光颜色>*<表面基底色>**

##### 漫反射

在现实中大多数物体表面都是粗糙的

**<漫反射光颜色>=<入射光颜色>\*<表面基底色>* cosα**

入射角 α 可以通过光线方向和法线方向 的点积来计算

**cosα = <光线方向>*<法线方向>**

当漫反射和环境反射同时存在时，将两者加起来，就会得到物体最终被观察到的颜色

**<表面的反射光颜色>=<漫反射光颜色>+<环境反射光颜色>**

##### 雾化

雾化，用来表示距离越远看的越模糊的现象

雾化实现是通过某点和视点之间的距离，距离越远雾化程度越高。这种雾化也称为线性雾化。某一点的雾化程度也成为雾化因子

雾化因子计算 : 雾化因子 = ( 终点 - 当前点) / ( 终点 - 起点)

物体颜色计算 : 颜色 = 物体颜色 * 雾化因子 + 雾化颜色 *  (1- 雾化因子)

#### [正射投影](https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera)

> 正射投影相机（Orthographic Projection Camera），也称为平行投影相机，是一种在计算机图形学和计算机视觉中使用的相机模型。
>
> 与透视投影相机不同，正射投影相机是一种没有透视效果的相机模型，它将场景中的三维物体投影到一个平面上，而不考虑距离和深度。因此，正射投影相机可以保持物体在图像中的大小和形状不变，不受距离和角度的影响。
>
> 在计算机图形学和计算机视觉中，正射投影相机通常用于生成二维图像，对于需要精确测量物体大小和形状的应用场景非常有用。例如，在工业设计、建筑设计和制造业中，正射投影相机可以用于生成精确的工程图纸和测量图像中物体的尺寸。

```js
const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
```

#### 透视投影

```js
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
```

#### 光源

##### 环境光 AmbientLight

基础光源，作用在当前场景内的所有物体上

##### 点光源 PointLight

空间中的一个点，向所有方向发射光线，如:恒星光源

##### 聚光灯光源SpotLight

如:灯光、手电筒等

##### 平行光 DirectionalLight

如:太阳光照射在地球上

##### 半球光 HemisphereLight

不会产生阴影

可以参考夕阳和日出时的光，创建更加自然的户外效果

```js
// 添加灯光
const hemisphereLight = new THREE.HemisphereLight(0xff00ff, 0x00ff00);
hemisphereLight.position.set(-10,10,30);
scene.add(hemisphereLight);
```

##### 面光源 AreaLight

散发光线的平面，不是一个点

##### 镜面眩光 LensFlare 光源特殊效果（不是光源）


可以为光源添加眩光效果

#### 材质

##### 基础材质

1. 网络基础材质（MeshBasicMaterial）：这是最简单的材质类型之一，它只显示三维模型的基本颜色或纹理贴图，没有任何光照和阴影的效果。这种材质适合于简单的模型或需要快速渲染的场景。
2. 网络深度材质（MeshDepthMaterial）：这种材质可以显示三维模型的深度信息，并将深度信息转换成灰度值来渲染模型。它通常用于制作阴影和深度效果，比如在VR或AR应用中，可以用它来实现虚拟物体与实际物体的交互。
3. 网络法向材质（MeshNormalMaterial）：这种材质可以显示三维模型每个面的法向量信息，并将法向量信息转换成颜色来渲染模型。它通常用于调试模型，以便更好地理解法向量和光照的关系。
4. 网络面材质（MeshFaceMaterial）：这种材质可以显示三维模型每个面的不同材质，即每个面可以使用不同的纹理或颜色来进行渲染。它通常用于多材质模型的制作，比如将一个汽车模型的车身、轮胎、玻璃等各个部分分别使用不同的材质进行渲染。

##### 高级材质

1. 网络郎伯材质（MeshLambertMaterial）：这种材质使用兰伯特光照模型来计算光照效果，即基于物体表面法向量和光源方向之间的夹角来计算表面的漫反射强度。它通常用于创建柔和的、无光泽的表面，并且不支持镜面反射等高级光照效果。
2. 网络Phong材质（MeshPhongMaterial）：这种材质使用Phong光照模型来计算光照效果，即通过计算反射光的入射角和出射角来计算表面的漫反射和镜面反射强度。它比Lambert材质提供了更加真实的光照效果，并支持镜面反射和高光等效果。
3. 着色器材质（ShaderMaterial）：这种材质使用自定义的着色器程序来计算渲染效果，可以通过编写自己的着色器程序来实现更加高级的渲染效果，比如体积渲染、阴影、全局照明等复杂效果。
4. 直线基础材质（LineBasicMaterial）：这种材质用于渲染三维场景中的线条，它只显示线条的基本颜色和宽度等信息，没有任何阴影或光照效果。
5. 虚线材质（LineDashedMaterial）：这种材质用于渲染虚线线条，它可以通过设置虚线的间隔和偏移量等参数来控制虚线的样式。它也不支持阴影或光照效果。

##### 基础属性

| 属性名称    | 描述                                                       |
| :---------- | :--------------------------------------------------------- |
| id          | 标识，创建物体时赋值                                       |
| name        | 名称，可以通过此属性赋值给物体名称                         |
| opacity     | 透明度，取值范围0~1，需要和transparent结合使用             |
| transparent | 是否透明，true透明，并且可以修改透明度，false不透明        |
| overdraw    | 过度描绘，可以消除在使用CanvasRenderer渲染时物体之间的缝隙 |
| visible     | 是否可见，是否能在场景中看到此物体                         |
| side        | 侧面，设置在哪一面使用材质                                 |
| needsUpdate | 是否需要刷新，可以刷新材质缓存                             |

##### 融合属性

决定物体如何与背景融合

| blending         | 融合，决定物体上的材质如何与背景融合               |
| ---------------- | -------------------------------------------------- |
| blendsrc         | 融合源，创建自定义的融合模式                       |
| blenddst         | 融合目标                                           |
| blendingequation | 融合公式，指定融合算法如何将源和目标颜色混合在一起 |

##### 高级属性

控制底层webgl上下文如何渲染物体

| 属性名称   | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| depthTest  | 深度测试，指定是否开启深度测试                               |
| depthWrite | 是否影响深度缓存，指定是否允许写入深度缓存                   |
| alphaTest  | alpha测试，指定一个值，如果某个像素的值小于它，则不会将该像素展示 |

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

 
