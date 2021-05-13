https://zhuanlan.zhihu.com/p/353544830

**background-color**

**background-image**

**background-repeat**

**background-position**

**background-attachment**

**background-clip**

**background-origin**

**background-size**

**background （简写属性）**



**（1）background-color** 用以设置背景颜色，写rgb值和十六进制值都可以。



**（2）background-image** 来设置背景图和背景渐变色，可选值：

1）background-image：url(xx.jpg) 使用相对路径引入图片

-如果背景图片大于元素大小，则图片默认会显示左上角的部分

-如果背景图片小于元素大小，则会默认平铺图片充满元素

-可以同时设置背景颜色和背景图片，背景颜色作为图片的底色，一般都会同时设置，图片没加载出时显示颜色



2）linear-gradient（color1，color2，color3...）

线性渐变默认从上至下，在颜色前加上方向可以指定渐变的方向，指定角度可以改变渐变角度，例子：

background-image:linear-gradient（to right, red, yellow） 渐变就会从左到右，从红色渐变为黄色

background-image:linear-gradient（45deg, red, yellow） 渐变从红色渐变为黄色,方向旋转45度



渐变可以同时指定多个颜色，多个颜色默认情况下平均分布，也可以指定开始渐变的位置，例子：

background-image：linear-gradient（red 50px，yellow 100px）

表示50px以上的位置是红色纯色，从50px以下位置开始向黄色渐变到100px位置，之后是黄色纯色



3）repeating-linear-gradient 可以平铺线性渐变，按指定数值的差值重复



4）background-image：radial-gradient（color1，color2，color3...）

径向渐变，默认情况下，径向渐变形状根据元素的形状来计算的，在元素中心开始径向渐变。可以手动指定径向渐变的大小；也可以指定径向开始的位置

例子：

background-image：radial-gradient（100px 100px， red， yellow ）

表示径向渐变大小是100*100px，其余空间则显示黄色



background-image：radial-gradient（100px 100px at 0 0, red, yellow ）

at 后面可以指定位置，表示径向渐变开始的位置，大小也可以不写，直接at后写位置



5）repeating-radial-gradient 可以指定重复的径向渐变



**（3）background-repeat** 来设置背景图像的重复方式，可选值：

-repeat 默认值，背景图片会双方向重复

-no-repeat 不重复背景图片，有多大显示多大

-repeat-x 水平方向重复

-repeat-y 垂直方向重复



**（4）background-position** 调整背景图片位置，可选值：

-top right left bottom center 可以用这些中的两个值来指定位置，

如 background-position：bottom center

-如果只给出一个值，则第二个值默认为center

-也可以直接指定两个偏移量：

第一个是水平偏移量，第二个是垂直偏移量,正值就是向右或向下，负值则是向左或向上

如：background-position：100px 0px



**（5）background-attachment** 用来设置图片是否随着页面滚动而滚动，可选值：

-scroll 默认值，会随着页面滚动

-fixed 背景图片会固定在某个位置，不随页面滚动 背景图片相对于浏览器的窗口不动，一般设置给body，如果设置给其他元素设置的话，当页面滚动到这个元素结束时，图片会随着它一起结束



**（6）background-clip** 设置背景范围，可选值：

-border-box 默认值，背景会出现在边框下边

-padding-box 背景只会出现在内容区



**（7）background-origin** 背景图片定位的偏移量计算的定位原点，可选值：

-padding-box 默认值 从内边距开始计算

-content-box 从内容区处计算

-border-box 从边框处计算

**（8）background-size** 设置背景图片大小

-直接写值，两个值指定宽高

-写一个值，第二个默认是auto，等比变化

-写百分数，第二个值auto，横向/纵向撑满

-cover，比例不变将元素铺满

-contain 比例不变，图片在元素中完整显示



**（9）background （简写属性）**

background所有相关属性都可以用其设置，无顺序数量要求，但是：

**background-size必须写在background-position后，用斜杠隔开 center center/contain**

background-clip必须在background-origin后



**（10）轮廓阴影和圆角属性**

1）outline 用来设置轮廓线，用法和border一样，但是不会影响奥可见框大小不会影响整个布局，一般用在设置移入状态hover

2）box-shadow：x偏移量 y偏移量 阴影模糊半径 颜色rgba

设置的阴影不会影响页面布局

3）border-radius 设置圆角

border-top-left-radius 左上圆角

border-top-right-radius 右上圆角

border-bottom-left-radius 左下圆角

border-bottom-right-radius 右下圆角

-指定一个值是圆角，指定一对值是椭圆，第一个是水平方向，第二个是垂直：

border-radius：20px / 40px 椭圆

-指定四个值就是顺时针指定圆角；三个值 左上 右上&左下 右下；两个值 左上&右下 右上&左下

-border-radius:50% 变为圆形