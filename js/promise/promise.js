// function time(item){
// 	setTimeout(()=>{
// 		item && item()
// 	},1000)
// }

// time(()=>{
// 	console.log();
// })
function time(){
	return new Promise((resolve)=>{
		setTimeout(()=>{
			resolve('hello promise')
		},1000)
	})
}
//promise实例里的resolve函数 就是后面.then里的方法 promise里还有一个reject
time()
.then(val=>{
	console.log(val)
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(233)
		},3000)
	})
})
.then(listId=>{
	console.log('请求了'+listId+'数据并返回了')
})