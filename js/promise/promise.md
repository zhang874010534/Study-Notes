# Promise



```js
p.then(``function``(value) {
 ``//code
}, ``function``(value) {
 ``//code
});
```

- promise.then
  
  - then方法的参数是两个回调函数。
  
  - 如果p处于Resolved完成状态，那么执行第一个回调函数，如果处于Rejected状态
  
  - 回调函数中的参数value，分别是传递给resolve和reject函数的参数。
  
  - 第二回调函数是可以省略的。
  
    

- 代码示例

  - ```js
    const fs=require('fs')
    
    function readFile(path){
    	var promise =new Promise(function(resolve,reject){
    		fs.readFile(path,"utf-8",(err,data)=>{
    			if(err) return reject(err)
    			resolve(data)
    		})
    	})
    	
    
    	return promise
    
    }
    var p=readFile('./3.txt');
    p.then(function(data){
    	console.log(data);
    },function(err){
    	console.log(err);
    })
    ```

  - 实例化promise的时候已经执行异步操作，但是没有主程序快所以then可以在这之前执行并且给resolve、reject赋值