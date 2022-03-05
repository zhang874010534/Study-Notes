地址: https://www.cnblogs.com/liuxianan/p/js-excel.html

npm: https://www.npmjs.com/package/xlsx

# js-xlsx 介绍

由[SheetJS](https://sheetjs.com/)出品的`js-xlsx`是一款非常方便的只需要纯JS即可读取和导出excel的工具库，功能强大，支持格式众多，支持`xls`、`xlsx`、`ods`(一种OpenOffice专有表格文件格式)等十几种格式。本文全部都是以`xlsx`格式为例。

- 官方github：https://github.com/SheetJS/js-xlsx
- 本文配套demo在线演示地址：http://demo.haoji.me/2017/02/08-js-xlsx/

## 1.1. 兼容性

兼容性如下图：

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101048813-1241756148.png)

## 1.2. 如何使用

`dist`目录下有很多个JS文件，一般情况下用`xlsx.core.min.js`就够了，`xlsx.full.min.js`则是包含了所有功能模块。

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101107365-1351805802.png)

直接`script`标签引入即可：

```html
<script type="text/javascript" src="./js/xlsx.core.min.js"></script>
```

# 读取excel

读取excel主要是通过`XLSX.read(data, {type: type});`方法来实现，返回一个叫`WorkBook`的对象，type主要取值如下：

- `base64`: 以base64方式读取；
- `binary`: BinaryString格式(byte n is data.charCodeAt(n))
- `string`: UTF8编码的字符串；
- `buffer`: nodejs Buffer；
- `array`: Uint8Array，8位无符号数组；
- `file`: 文件的路径（仅nodejs下支持）；

## 2.1. 获取workbook对象

### 2.1.1. 读取本地文件

直接上代码：

```js
// 读取本地excel文件
function readWorkbookFromLocalFile(file, callback) {
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		var workbook = XLSX.read(data, {type: 'binary'});
		if(callback) callback(workbook);
	};
	reader.readAsBinaryString(file);
}
```

### 2.1.2. 读取网络文件

```js
// 从网络上读取某个excel文件，url必须同域，否则报错
function readWorkbookFromRemoteFile(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e) {
		if(xhr.status == 200) {
			var data = new Uint8Array(xhr.response)
			var workbook = XLSX.read(data, {type: 'array'});
			if(callback) callback(workbook);
		}
	};
	xhr.send();
}
```

## 2.2. 详解 workbook

### 2.2.1. Workbook Object

`workbook`里面有什么东西呢，我们打印出来看一下：

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101133858-640072825.png)

可以看到，`SheetNames`里面保存了所有的sheet名字，然后`Sheets`则保存了每个sheet的具体内容（我们称之为`Sheet Object`）。每一个`sheet`是通过类似`A1`这样的键值保存每个单元格的内容，我们称之为单元格对象（`Cell Object`）：

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101155780-1647439178.png)

### 2.2.2. Sheet Object

每一个`Sheet Object`表示一张表格，只要不是`!`开头的都表示普通`cell`，否则，表示一些特殊含义，具体如下：

- `sheet['!ref']`：表示所有单元格的范围，例如从A1到F8则记录为`A1:F8`；
- `sheet[!merges]`：存放一些单元格合并信息，是一个数组，每个数组由包含`s`和`e`构成的对象组成，`s`表示开始，`e`表示结束，`r`表示行，`c`表示列；
- 等等；

关于单元格合并，看懂下面这张图基本上就没问题了：

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101220647-923643638.png)

结果如下：

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101325362-1180321806.png)

### 2.2.3. 单元格对象

每一个单元格是一个对象（`Cell Object`），主要有`t`、`v`、`r`、`h`、`w`等字段（详见[这里](https://github.com/SheetJS/js-xlsx#cell-object)）：

- t：表示内容类型，`s`表示string类型，`n`表示number类型，`b`表示boolean类型，`d`表示date类型，等等
- v：表示原始值；
- f：表示公式，如`B2+B3`；
- h：HTML内容
- w：格式化后的内容
- r：富文本内容`rich text`
- 等等

### 2.2.4. 读取workbook

普通方法：

```js
// 读取 excel文件
function outputWorkbook(workbook) {
	var sheetNames = workbook.SheetNames; // 工作表名称集合
	sheetNames.forEach(name => {
		var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
		for(var key in worksheet) {
			// v是读取单元格的原始值
			console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
		}
	});
}
```

根据`!ref`确定excel的范围，再根据`!merges`确定单元格合并（如果有），最后输出整个table，比较麻烦，幸运的是，插件自身已经写好工具类`XLSX.utils`给我们直接使用，无需我们自己遍历，工具类输出主要包括如下：

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101342744-1582872577.png)

有些不常用，常用的主要是：

- `XLSX.utils.sheet_to_csv`：生成CSV格式
- `XLSX.utils.sheet_to_txt`：生成纯文本格式
- `XLSX.utils.sheet_to_html`：生成HTML格式
- `XLSX.utils.sheet_to_json`：输出JSON格式

常用的主要是`sheet_to_csv`或者`sheet_to_html`，转csv的话会忽略格式、单元格合并等信息，所以复杂表格可能不适用。转html的话会保留单元格合并，但是生成的是`<html></html>`代码，而不是`<table></table>`，需要对表格进行一些定制时不太方便，所以具体还是要视情况来采用合适的工具类。

这里写一个采用转csv方式输出结果的简单示例，可点击这里查看[在线DEMO](http://demo.haoji.me/2017/02/08-js-xlsx/)：

```js
function readWorkbook(workbook)
{
	var sheetNames = workbook.SheetNames; // 工作表名称集合
	var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
	var csv = XLSX.utils.sheet_to_csv(worksheet);
	document.getElementById('result').innerHTML = csv2table(csv);
}

// 将csv转换成简单的表格，会忽略单元格合并，在第一行和第一列追加类似excel的索引
function csv2table(csv)
{
	var html = '<table>';
	var rows = csv.split('\n');
	rows.pop(); // 最后一行没用的
	rows.forEach(function(row, idx) {
		var columns = row.split(',');
		columns.unshift(idx+1); // 添加行索引
		if(idx == 0) { // 添加列索引
			html += '<tr>';
			for(var i=0; i<columns.length; i++) {
				html += '<th>' + (i==0?'':String.fromCharCode(65+i-1)) + '</th>';
			}
			html += '</tr>';
		}
		html += '<tr>';
		columns.forEach(function(column) {
			html += '<td>'+column+'</td>';
		});
		html += '</tr>';
	});
	html += '</table>';
	return html;
}
```

# 导出excel

导出分为2种，一种是基于现有excel修改，一种是全新生成，前者比较简单，我们这里着重讲后者。

## 3.1. 自己手写代码生成

导出excel文件，主要是如何生成一个`sheet`，我们这里写一个最简单的csv转excel示例：

```js
// csv转sheet对象
function csv2sheet(csv) {
	var sheet = {}; // 将要生成的sheet
	csv = csv.split('\n');
	csv.forEach(function(row, i) {
		row = row.split(',');
		if(i == 0) sheet['!ref'] = 'A1:'+String.fromCharCode(65+row.length-1)+(csv.length-1);
		row.forEach(function(col, j) {
			sheet[String.fromCharCode(65+j)+(i+1)] = {v: col};
		});
	});
	return sheet;
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
	sheetName = sheetName || 'sheet1';
	var workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	var wbout = XLSX.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}
```

拿到上面的blob对象就可以直接下载了，参考我之前在[JS弹出下载对话框](http://blog.haoji.me/js-download.html#JS-dan-chu-xia-zai-dui-hua-kuang)里面封装好的`openDownloadDialog`方法：

```js
/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName)
{
	if(typeof url == 'object' && url instanceof Blob)
	{
		url = URL.createObjectURL(url); // 创建blob地址
	}
	var aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	var event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else
	{
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}
```

所以，最终下载实现如下：

```js
// 传入csv，执行后就会弹出下载框
function exportExcel(csv) {
	var sheet = csv2sheet(csv);
	var blob = sheet2blob(sheet);
	openDownloadDialog(blob, '导出.xlsx')；
}
```

## 3.2. 利用官方工具类生成

其实上面这些代码都不需要我们手写，官方已经提供好了现成的工具类给我们使用，主要包括：

- `aoa_to_sheet`: 这个工具类最强大也最实用了，将一个二维数组转成sheet，会自动处理number、string、boolean、date等类型数据；
- `table_to_sheet`: 将一个`table dom`直接转成sheet，会自动识别`colspan`和`rowspan`并将其转成对应的单元格合并；
- `json_to_sheet`: 将一个由对象组成的数组转成sheet；

`aoa_to_sheet`示例：

```js
var aoa = [
	['姓名', '性别', '年龄', '注册时间'],
	['张三', '男', 18, new Date()],
	['李四', '女', 22, new Date()]
];
var sheet = XLSX.utils.aoa_to_sheet(aoa);
openDownloadDialog(sheet2blob(sheet), '导出.xlsx');
```

`table_to_sheet`就更简单了，直接`XLSX.utils.table_to_sheet($('table')[0])`即可；

## 3.3. 处理单元格合并

一般来说，前端生成`excel`而不是`csv`最主要目的都是为了解决csv不能实现单元格合并的问题，要不然直接导出csv文件就好了，何必引入几百kb的插件。

假设我们要生成如下格式的excel文件，其中`A1-C1`进行单元格合并：

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101229792-714428734.png)

代码如下：

```js
var aoa = [
	['主要信息', null, null, '其它信息'], // 特别注意合并的地方后面预留2个null
	['姓名', '性别', '年龄', '注册时间'],
	['张三', '男', 18, new Date()],
	['李四', '女', 22, new Date()]
];
var sheet = XLSX.utils.aoa_to_sheet(aoa);
sheet['!merges'] = [
	// 设置A1-C1的单元格合并
    {s: {r: 0, c: 0}, e: {r: 0, c: 2}}
];
openDownloadDialog(sheet2blob(sheet), '单元格合并示例.xlsx');
```

需要注意的地方就是被合并的单元格要用`null`预留出位置，否则后面的内容（本例中是第四列`其它信息`）会被覆盖。

## 3.4. 自定义样式

普通版本不支持定义字体、颜色、背景色等，有这个功能需要的可以使用[pro版](http://sheetjs.com/pro)，好像是要收费的，因为官网没看到下载地址。