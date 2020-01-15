//发布订阅模式

//绑定的方法都有一个update方法
function Dep(){
	this.subs=[]
}
Dep.prototype.addSub=function(sub){
	this.subs.push(sub);
}

Dep.prototype.notify=function(){
	this.subs.forEach(sub=>{
		sub.update()
	})
}

function Watcher(fn){
	this.fn=fn;
}
Watcher.prototype.update=function(){
	this.fn()
}
let watcher=new Watcher(function(){//监听函数
	console.log(1);
})
let dep=new Dep();
//订阅
dep.addSub(watcher);
dep.addSub(watcher);
//发布
dep.notify()
