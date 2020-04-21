// let car={
// 	brand:'masaladi',
// 	price:'666'
// }
let car={
}
let val=666

//创建一个信息订阅者Dep
class Dep{
	constructor() {
	    this.subs=[]
	}
	//添加订阅者
	addSub(sub){
		this.subs.push(sub)
	}
	//判断是否添加订阅者
	// depend(){
	// 	if
	// }
	
	//通知订阅者更新
	notify(){
		this.subs.forEach(item=>{
			item.update()
		})
	}
}
Dep.target=null


//将对象转化成可观察的对象
let dep=new Dep()
Object.defineProperty(car,'price',{
	get(){
		console.log('price属性被读取了');
		return val
	},
	set(newVal){
		console.log('price属性被修改了');
		val=newVal
	}
	
})

