# 大纲-day01
## 初识Nodejs
- JavaScript是什么？ 
- JavaScript可以运行在哪里？ 

![](img/1.png)

浏览器 | 内核    
-------|---------
IE     | Trident 
FireFox| Gecko   
Chrome | WebKit  
Safari | WebKit  
Opera  | Presto  
Edge   | Chakra  

## Node.js的诞生
![image](img/2.png)

- 作者Ryan Dahl 瑞恩·达尔
    + 2004 纽约 读数学博士 
    + 2006 退学到智利 转向开发 
    + 2009.5对外宣布node项目，年底js大会发表演讲 
    + 2010 加入Joyent云计算公司 
    + 2012 退居幕后

> Node.js 是一种建立在Google Chrome’s v8 engine上的 non-blocking (非阻塞）, event-driven （基于事件的） I/O平台. 
Node.js平台使用的开发语言是JavaScript，平台提供了操作系统低层的API，方便做服务器端编程，具体包括文件操作、进程操作、通信操作等系统模块

## Node.js可以用来做什么？

- 具有复杂逻辑的动态网站 
- WebSocket服务器 
- 命令行工具 
- 带有图形界面的本地应用程序 
- ......

## 终端基本使用
### 打开应用
- notepad 打开记事本
- mspaint 打开画图
- calc 打开计算机
- write 写字板
- sysdm.cpl 打开环境变量设置窗口
### 常用命令
- md 创建目录 make

- rmdir(rd) 删除目录，目录内没有文档。remove directory

- rd /s/q abc        subdirectory  quiet  子目录有东西不让删可以这个样子

- echo on > a.txt 创建空文件  on可以省略 echo hello > a.txt 讲hello字符串写进这个记事本

   echo hello >> a.txt 不会覆盖

- del 删除文件

- rm 文件名 删除文件

- cat 文件名 查看文件内容  type也行

- cat > 文件名 向文件中写上内容。 这个type不行

## Node.js开发环境准备

1. 普通安装方式[官方网站](https://nodejs.org/zh-cn/)

2. 多版本安装方式
    - 卸载已有的Node.js
    - 下载[nvm](https://github.com/coreybutler/nvm-windows)  node version manager
    - 在C盘创建目录dev
    - 在dev目中中创建两个子目录nvm和nodejs
    - 并且把nvm包解压进去nvm目录中
    - 在install.cmd文件上面右键选择【以管理员身份运行】
    - 打开的cmd窗口直接回车会生成一个settings.txt文件，修改文件中配置信息
    - 配置nvm和Node.js环境变量
        + NVM_HOME:C:\dev\nvm
        + NVM_SYMLINK:C:\dev\nodejs
    - 把配置好的两个环境变量加到Path中
## nvm常用的命令
- nvm list 查看当前安装的Node.js所有版本  直接nvm 告诉可以输入的指令
- nvm install 版本号 安装指定版本的Node.js
- nvm uninstall 版本号 卸载指定版本的Node.js
- nvm use 版本号 选择指定版本的Node.js

## Node.js之HelloWorld
- 命令行方式REPL read eval print loop
- 运行文件方式  _+3  就是上一个结果+3     .exit可以退出node环境
- 全局对象概览

## 服务器端模块化
- 服务器端模块化规范CommonJS与实现Node.js
- 模块导出与引入
- 模块导出机制分析
- 模块加载规则
    + 模块查找 不加扩展名的时候会按照如下后缀顺序进行查找 .js .json .node
- 模块分类
    + 自定义模块
    + 系统核心模块
        * fs 文件操作
        * http 网络操作
        * path 路径操作
        * querystring 查询参数解析
        * url url解析
        * ......

## ES6常用语法
- 变量声明let与const
- 变量的解构赋值
    + 数组解构赋值
    + 对象解构赋值
    + 字符串解构赋值
- 字符串扩展
    + includes()
    + startsWith()
    + endsWith()
    + 模板字符串
- 函数扩展
    + 参数默认值
    + 参数结构赋值
    + rest参数
    + 扩展运算符
    + 箭头函数
- 类与继承