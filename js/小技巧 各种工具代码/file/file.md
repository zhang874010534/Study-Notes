https://blog.csdn.net/zhq2005095/article/details/89069851

# [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

`Blob` (Binary Large Object) 对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的API（比如 `File` 对象），都是建立在 `Blob` 对象基础上的，继承了它的属性和方法。

````js
var domstring = '<div>Hello world</div>';
var blob1 = new Blob([domstring], {type: 'text/html'});

var buffer = new ArrayBuffer(8);
var blob2 = new Blob([buffer], {type: 'text/plain'});
````

# [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

我们知道 `Blob` 对象只是二进制数据的容器，本身并不能操作二进制，`FileReader` 对象就是专门操作二进制数据的，`FileReader` 主要用于将文件内容读入内存，通过一系列异步接口，可以在主线程中访问本地文件。

## 属性

- FileReader.error：表示在读取文件时发生的错误；
- FileReader.readyState：0-还没有加载任何数据, 1-数据正在被加载, 2-已完成全部的读取请求；
- FileReader.result：文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。

## 事件

- FileReader.onabort：处理 abort 事件。该事件在读取操作被中断时触发；
- FileReader.onerror：处理 error 事件。该事件在读取操作发生错误时触发；
- FileReader.onload：处理 load 事件。该事件在读取操作完成时触发；
- FileReader.onloadstart：处理 loadstart 事件。该事件在读取操作开始时触发；
- FileReader.onloadend：处理 loadend 事件。该事件在读取操作结束时（要么成功，要么失败）触发；
- FileReader.onprogress：处理 progress 事件。该事件在读取 Blob 时触发

## 方法

- FileReader.abort()：中止读取操作。在返回时，readyState 属性为DONE；
- FileReader.readAsArrayBuffer()：开始读取指定的 Blob 中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象；
- FileReader.readAsBinaryString()：开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含所读取文件的原始二进制数据, 该方法将文件读取为二进制字符串，通常我们将它传送到后端，后端可以通过这段字符串存储文件；
- FileReader.readAsDataURL()：开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个 data: URL 格式的字符串以表示所读取文件的内容；
- FileReader.readAsText()：开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个字符串以表示所读取的文件内容, 该方法有两个参数，其中第二个参数是文本的编码方式，默认值为 UTF-8。这个方法非常容易理解，将文件以文本方式读取，读取的结果即是这个文本文件中的内容。

````js
var input  = document.getElementById("file"); //input file
input.onchange = function(){
    var file = this.files[0];
    if(!!file){
        var reader = new FileReader();
        // 将图片转成DataURL格式
        reader.readAsDataURL(file);
        reader.onload = function(){
            //读取完毕后输出结果
           document.getElementById("file_img").src = reader.result //显示上传的图片
           console.log(reader.result);
        }
    }
}
````

# URL

## URL.createObjectURL(blob)

````JS
//blob参数是一个File对象或者Blob对象.
var objecturl =  window.URL.createObjectURL(blob);
````

