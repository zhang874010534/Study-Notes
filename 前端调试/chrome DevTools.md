# 快捷键

ctrl + shift + d 切换devTools 布局

ctrl + `  show console

# Animaition

more tools => Animation

可以让动画变慢，让我们更容易看清

# Show source order

Elements => accessibility => Show source order

屏幕上查看页面元素的排列顺序，这可以更好地进行可访问性检查。

HTML 文档中内容的顺序对于搜索引擎优化和提升可访问性至关重要。新的 CSS 特性允许开发人员创建页面内容，这些新创建的内容，在屏幕上的顺序和原来 HTML 文档中的顺序大不相同。这会导致很大的可访问性问题，因为使用屏幕阅读器的用户可能获得和正常用户不同的内容，这是最可能使人感到困惑的用户体验。

# chrome收藏夹 outline
javascript: (function() { var elements = document.body.getElementsByTagName('*'); var items = []; for (var i = 0; i < elements.length; i++) { if (elements[i].innerHTML.indexOf('html * { outline: 1px solid red }') != -1) { items.push(elements[i]); } } if (items.length > 0) { for (var i = 0; i < items.length; i++) { items[i].innerHTML = ''; } } else { document.body.innerHTML += '<style>html * { outline: 1px solid red }</style>'; } })();

# chrome控制台输入 自由编辑页面内容
document.documentElement.contentEditable = true

# 0x01 动态修改元素样式类名

增删类名在条件逻辑中比较常见，通过devtools可以直接动态修改/激活/禁用类名

1. 在DOM树中选中元素
2. 点击激活`.cls`
3. 可通过选择框动态修改是否使用该类名
4. 可通过`Add new class`输入框动态添加已定义类名

![动态修改class.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1adbeed6002d483bbd5f7e291cd5dea2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

除了给元素修改类名，还可以动态添加css规则 ![动态添加class.2021-02-05 16_49_27.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b84e87eebd914df385177d4b6d93fe08~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x02 强制激活伪类

网页中一些动效是基于例如`:active`、`:hover`等，当鼠标移动到控制台时，这些伪类就不生效，在控制台中也无法调试css样式，此时可以使用强制激活伪类

1. 选中具有伪类效果的元素
2. 点击`:hov`
3. 根据代码情况，勾选相应伪类
4. 在styles面板可动态调试伪类样式

![强制激活伪类.2021-02-05 16_45_39.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf19a2ba2c4a48fdb497d0bf7a40b8a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) **操作方法2：**也可在DOM树中右键菜单 -> `Force State` -> 勾选对应伪类

# 0x03 计算样式定位到CSS规则

一个工程项目的DOM层级是比较复杂（深），例如`font-size`这一样式属性，就可能存在多层覆盖，我们必须定位到最终表现生效的CSS，才能做出有效修改。

1. 在`Computed`面板中的`filter`输入框筛选样式属性名
2. 展开属性，剋看到多处定义，且只有第一行生效
3. 鼠标hover时，左侧显示`->`，点击可跳转到`Styles`面板中的CSS规则
4. 可在生效的CSS规则中修改样式

![计算样式定位css规则.2021-02-05 16_51_30.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4622731ed6494b918d31dde8a23571bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 在计算样式中可以看到显示在浏览器中的真实大小，在定位IOS客户端中文字换行问题中，发现Android系统设置了字体大小为“极小”，导致学生端与教师端显示不一致。

# 0x04 颜色选择器

在调试CSS中，设置颜色相关属性的值，颜色有`HEX`、`RGBA`、`RGB`、`HSLA`的形式，作为一名专业的前端开发工程狮，共 `255^3 = 16581375`种颜色，反正老夫是记不住。 但可以通过Chrome提供的颜色选择器，动态修改颜色

1. 找到CSS中设置颜色的属性
2. 点击颜色值左侧的选择器（彩色方块）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb9ff66d83984d2ea7a37ef9d2d5d953~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x05 阴影选择器

阴影选择器用于`box-shadow`属性，可以直接通过选择器可视化调整

1. 点击`box-shadow`属性右侧的“层叠偏移图标”，弹出阴影选择器
2. 通过颜色选择器面板可设置横纵轴偏移量、阴影模糊度和扩散度、内外阴影

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b34da4c3083f4e93a2ca21d32fe74201~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x06 CSS属性值快速调整

鼠标滚轮可以实现css属性值的微调或快速调整，比如字体大小、旋转角度、宽高数值等 鼠标滚轮不只是+-1

- **+-0.1**：`Option`+鼠标滚轮，windows系统是`Alt`+滚轮
- **+-1**：滚轮前后滚动
- **+-10**：`Shift`+鼠标滚轮
- **+-100**：`Command`+鼠标滚轮，Windows系统是`Ctrl`+滚轮

# 0x07 animation动画调试

某些元素动画效果可以通过“帧动画”、`transition`实现，开发实现过程中的代码过于抽象，实际上还是得在浏览器中查看效果。Chrome开发工具提供了针对animation的调试面板。该面板可提供动画重播、暂停、预览、修改 操作方法：

1. 打开控制台，键盘按“ESC”，调出Console面板
2. 点击Console面板左上角“竖三点”，弹出菜单选择“Animations”，即可打开动画调试面板

![animations调试.2021-02-05 16_47_54.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be8676fd65884773bf8888e961746131~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 在动画面板可以看到帧动画的名称和对应DOM节点，点击第一列的DOM节点，可以快速定位到Elements面板中DOM所在位置，同时Styles面板也会更新，可滚动Styles面板到底部即可看到已定义的“帧动画” 动画面板的作用：

- 定位动画作用的DOM结构
- 控制动画执行过程：播放、暂停、重播、减速动画、控制执行时间
- 预览动画执行过程、动画时间曲线
- 侦听记录所有动画过程

# 0x08 复制控制台变量到剪贴板

Console面板输出了很多日志，当我们想要复制一个打印的复杂对象时，发现直接复制会导致数据丢失，此时只需要一个`copy()`函数，即可将变量复制到剪贴板 ![复制控制台变量到剪贴板.2021-02-05 16_50_42.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eec3fbcebaf442828374b04f1499bc65~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x09 网页可视化编辑

F12工程师，可以快速伪造网页了 在控制台(`Console`)执行：

- `document.body.contentEditable="true"`
- 或`document.designMode = "on"`

# ![网页可视化编辑.2021-02-05 16_44_55.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f3b56c52cf344adbf5cf34ed085b622~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)0x0A 模拟弱网环境

在`Network Tab`下，可在`Online`下拉框选择模拟弱网环境 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ade30b7f0384247805beb82602df422~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 同时还可以添加自定义的网络环境可设置上传网速、下载网速和网络延时 ![模拟网络环境.2021-02-05 16_42_54.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dda187aa397e4665b8875c43caae6706~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x0B XHR重放

`XML HTTP Request`会在`Network Tab`下记录，选中对应的`XHR`记录，右键可以重放网络请求。 此外，如果还想在重放请求时修改请求参数，则可以复制请求包到命令行下修改后执行 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/867093e7374347f3ad6eaf91082b0780~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

```bash
bash复制代码curl 'https://www.baidu.com/s?ie=utf-8&csq=1&pstg=21&mod=2&isbd=1&cqid=8e79bf0d0004f40d&istc=8905&ver=0QxsJN2ZOr4aje7f6_0UmO9Z20VzWyiNCYC&chk=5fc9f524&isid=F000276D55E53989&ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8&fenlei=256&rsv_pq=aa5b9db10000e460&rsv_t=5c57hKI5zVEqdfLfosNaYFxE%2B4vOfqPH059N%2FYFLF1bEBAux2Mo0HRD%2FeQA&rqlang=cn&rsv_enter=1&rsv_dl=ib&rsv_sug3=14&rsv_sug1=12&rsv_sug7=100&_ck=115040.0.-1.-1.-1.-1.-1&rsv_isid=33213_1459_33061_33113_33098_33101_33183_33181_33145_33211_33199_33217_22159_33216_33215_33185&isctg=5&rsv_stat=-2&rsv_sug7=100' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept: */*' \
  -H 'is_xhr: 1' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'is_referer: https://www.baidu.com/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8&fenlei=256&rsv_pq=aa5b9db10000e460&rsv_t=5c57hKI5zVEqdfLfosNaYFxE%2B4vOfqPH059N%2FYFLF1bEBAux2Mo0HRD%2FeQA&rqlang=cn&rsv_enter=1&rsv_dl=ib&rsv_sug3=14&rsv_sug1=12&rsv_sug7=100' \
  -H 'Accept-Language: zh-CN,zh;q=0.9' \
  -H 'Cookie: BIDUPSID=7FFA50202A583B0E5768F9404E44F84B; PSTM=1594532284; BD_UPN=123253; BAIDUID=F00027F4581A89A057BFF664D0C6D55E:FG=1; sugstore=0; H_WISE_SIDS=163166_163200_161505_150967_160246_160663_156287_161253_159548_159610_162915_155225_161299_163302_162372_159382_163162_160443_161421_157264_163396_161420_127969_161771_159066_161961_160898_161729_161922_131423_163164_128701_162117_158055_162168_161965_159954_160422_144966_162186_154213_161241_139884_158640_155529_160980_163114_147552_161880_161891_162268_162334_162851_162816_162642_159092_162264_162261_162155_110085_162026_163168_163317_163318_163319_163321; delPer=0; PSINO=2; BD_HOME=1; BD_CK_SAM=1; COOKIE_SESSION=769033_0_9_0_63_84_1_6_3_8_1_16_0_0_0_0_1605507855_0_1607056101%7C9%230_0_1607056101%7C1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_PS_PSSID=33213_1459_33061_33113_33098_33101_33183_33181_33145_33211_33199_33217_33149_22159_33216_33215_33185; H_PS_645EC=9555H%2BItaTBsNu7fj7yuWi%2BorvZXCBbqUWWWLmv7EAQQAseiCtR626mbuWU; BA_HECTOR=002105ah8g2l2h01c11fsjt950r' \
  --compressed
```

针对XHR请求，一般业务场景下返回的数据包都是json数据，因此还可以右键弹出菜单中选择复制response（常见于渲染侧同学拿到mock数据） ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06bea033b92f48a9917af7c3bb99ab66~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x0C 不一样的Console

## 12.1 console.log( ) | info( ) | debug( ) | warn( ) | error( )

在浏览器控制台中打印原始的字符串内容，并且根据不同的“等级”，而文字的颜色有所不同。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acdd7f604d7647cd981fafb474c166fb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 12.2 占位符

`Javascript`提供了很多占位符，可以用于调试输出的有如下：

- `%o` — 对象占位
- `%s` — 字符串占位
- `%d` — 数字占位

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e7894fa3b92484ba934ea6aa9aadda7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 12.3 Console也支持CSS

使用`%c`占位符，可以像写行内样式一样，自定义输出内容的样式 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b76f736c182b4db6a331fa9a17790138~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 12.4 表格形式展示JSON数据

`console.table()`更加直观/美观展示`JSON`格式数据 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdaa7c38c0054f80b6e9289e2000661b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 12.5 log组合

- `console.group() `
- `console.groupEnd()`

尽可能地将打印的信息组织在一起，如此可以是的我们的输出看起来就更加的有层次、有组织 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/930e8941ffd74478bf3626ed6e402909~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) ***预知更多，请参考：**[[翻译\]你真的会用console.log吗？](https://link.juejin.cn?target=https%3A%2F%2Fblog.dyboy.cn%2Fprogram%2F181.html)

# 0x0D 截图

网页截图，一般情况下我们都是使用第三方工具，其实Chrome已提供了截图功能。其使用方法如下图： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b62f7a1d6ee747a3983bf4371de6d8cb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 命令解释：

- ```
  Capture area screenshot
  ```

  - 自定义选中截图区域，和常用截图工具类似

- ```
  Capture full size screenshot
  ```

  - 截取HTML完整渲染图

- ```
  Capture node screenshot
  ```

  - 截取某个DOM节点的渲染图，使用前得先在`Elements Tab`下选中`DOM`节点

- ```
  Capture screenshot
  ```

  - 截取浏览器视窗所见屏幕

# 0x0E Performance

性能监控，在调试某个web网页，想要查看从HTML渲染到屏幕的过程或运行时用户交互时的渲染、重绘、重拍，内存占用、页面变化过程。那么就可以在`Performace Tab`下，点击红色小圆点即可录制页面的完整变化过程。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d93c854f3e5f4a369953a2f04ef52158~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 截图
- 内存占用，如果要更专注了解内存情况，可在Memory Tab下录制查看，其右侧的“垃圾桶”按钮是主动垃圾回收

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f454dbf14984a24a00f768f845dbca4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- js调用栈，可定位到对应的js文件可在source中预览

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c0b19ae156d43ba805da4088cc201bc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 通过该面板，可更直观看到画面与脚本代码执行的表现关系，方便定位在渲染中出现的显示问题。

# 0x0F Source Tab

在调试工具中的`Source Tab`是非常实用的一个面板，熟练运用可以快速从表象定位到代码问题。在开发调试的过程中，我们常常会`console`很多`log`，但在定位`BUG`原因时，如果代码调用层级比较深，那么仅通过`console`来解解决问题的效率就比较低。 `Source`面板中可以预览当前网页调用的所有静态资源以及源代码。整个面板的大致功能如下图： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/718363c079654c779c99086c3702f29d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 16.1 DEBUG工具栏

每个图标分别对应：

- 暂停（继续）
- 单步跳过
- 进入函数
- 跳出函数
- 单步执行
- 激活（关闭）所有断点
- 代码执行异常处自动断点
  - 需要勾选“Pause On Caught Exceptions”

## 16.2 右侧调试器

### 16.2.1 Watch

变量监控，对加入监听列表的变量进行监听,在该面板的右侧有“添加”和“刷新”变量列表的按钮

### 16.2.2 Call Stack

函数调用栈，断点执行到当前函数的调用栈，根据调用栈可以非常方便检索到项目中何处主动“递进”调用了该函数。 非常有用啊！实际案例，在解决编辑器做分页异常时通过调用栈以及源码面板中实时展示的变量，及时得定位到了产生问题的原因。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/035ed98707d144a7b981e16058fe94a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 16.2.3 Scope

作用域，当前断点所在函数所有属性的值。Scope 会显示三种类型的值： Local、Closure 和 Global。

### 16.2.4 Breakpoints

展示断点列表，将每个断点所在文件/行数/该行简略内容展示，勾选/取消勾选断点列表中的选择框，可激活/禁用断点

### 16.2.5 XHR Breakpoints

调试XHR，输入XHR的URL中的关键词，即可对URL中含有关键词的XHR做拦截

### 16.2.6 DOM Breakpoints

DOM断点，在`Elements`面板中右键DOM树中的节点，可以设置条件断点： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e89aba06600411abea5b3c134a09189~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- **subtree modifications**：子节点变化
- **attribute modifications：**当前节点属性修改
- **node remove**：当前节点被移除

### 16.2.7 Global Breakpoints

全局监听，在这里可以看到全局有哪些事件监听被注册绑定了什么函数，还可移除（`Remove`）对应的全局事件监听 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f92a3904f9a45e5b0725df38e23f1ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 16.2.8 Event Listener Breakpoints

事件监听断点，打开这个列表，在触发该事件时进入断点，调试器会停留在触发事件代码行。 展开事件列表，选择要监听的事件，勾选即可 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e5095777ce142518b1e7f1a2dd01b38~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 16.3 左侧导航栏

### 16.3.1 Page

整个`Source Tab`顾名思义就是源码面板，默认选中“Page栏目”在这里可以看到以域名为列表的静态资源文件目录树，点击文件在主视图中可以预览静态文件 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/973cdfcc8f3f42968eb9ef50fb51b482~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 16.3.2 Content Scripts

Chrome浏览器插件在内容区域的js脚本代码，如果调试工具不太能满足，大家也可以开发一个Chrome插件来提升开发调试效率（比如洪岩开发的在快速建课下生成roomid的二维码） ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8aa2bedc68e4f049225098f3bd3b42c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 16.3.3 Snippets

代码片段，开发者自己写一些调试代码的代码片段，比如解析`json`数据等工具函数。在代码片段中的代码可以访问当前页面中的变量和函数，不会因刷新而丢失。

- 右键即可“`run`”
- 不需要的时候可以右键“`remove`”

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f01c36914c1452d8e8ce8ef789c7c1f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) **其他的tab不太常用，暂时就不介绍了。。。**

## 16.4 主视图区

即预览静态资源的区域，类似于编辑器，顶部可以切换已打开的脚本/资源文件。预览是最基本的功能，主视图/面板还有其他重要功能。 断点的类型有三种： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb1ae1e632204faab1aa40e10911612e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 16.4.1 普通断点

点击代码行序号可以直接添加断点，效果类似于在代码里手动写入

```javascript
javascript
复制代码debugger;
```

### 16.4.2 条件断点

与此同时可修改当前断点为条件断点，需要添加条件代码片段用于判断当前断点是否需要中断 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ccd2c52fc93493598db213a1bd3ce18~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 如上图，增加了条件断点，相当于修改了源代码，主视图区的背景色会变成浅黄色，表示“已编辑”。

### 16.4.3 黑盒script

项目中例如引用了`jquery.min.js`之类的库文件，我们调试的时候并不需要关心，那么可以将此类脚本文件右键选择添加到“黑盒脚本”中，那么在`debug`单步调试时，就不会进入到此类库文件中，减少了调试步骤。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77904b61926a49ea9cb0328fc8c83a36~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x10 Coverage

代码使用率（有效率）统计，支持运行时录制统计。在例如我们引入了`jquery`但是只用了一个`hide()`方法，那么对于`jquery`的代码使用率就比较低。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b2558725188456384fba54fee9ef978~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 该统计支持css和js代码使用率的统计 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87d9d88239ce47e890ba64f3c35b7078~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x11 Rendering

监控页面重绘、重排时变化的区域进行高亮处理，还可查看帧率相关信息，用于网页性能优化

1. 在`more tools`菜单中可选择`Rendering`工具

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c724b7acf88b4e59b22998513459b22c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 0x12 Layers

层，当一个页面足够复杂的时候，在`css`加持下，可能会出现一些渲染性能问题，这时候可以通过`Layers`工具显式地查看`DOM`层关系。

1. 在`more tools`菜单中可选择`Layers`工具

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dab34283475247fa8b67690cbd40a425~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 更多关于浏览器渲染可以参考文章：[深入浏览器渲染](https://bytedance.feishu.cn/docs/doccnHAeCE9IydcYLoFkptEYAjd)

# 0x13 移动端H5调试

`Chrome`浏览器支持移动端`Android`移动端设备的调试，`Safari`支持`IOS`移动端设备的调试。 `Chrome`调试`Android`移动设备的步骤如下：

1. 数据线链接`PC`与`Android`设备，`Android`设备允许调试（开启调试模式，并允许当前设备调试移动端）
2. `Chrome`浏览器地址栏访问：`chrome://inspect`，可进入调试网页

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d073126edd4e8294ca1e7f8e21493e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 支持设备、网页`App`、页面、`Chrome`插件、`Works`和“其他”类型的调试

1. 点击`inspect`就可以如正常考试网页一样，调试移动端里的`webview`中运行的`web`程序

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9082df65040947ceb714010f62393fe1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 关于APP中的H5调试可参考文章：[APP中h5调试](https://bytedance.feishu.cn/docs/doccnk8b5kmUrlehWIGeVcUAsNC)
