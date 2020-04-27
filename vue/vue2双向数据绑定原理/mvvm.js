//首先页面加载 实例化对象shuai 疯狂触发observe这时候data里的变量都可以被观测
//Compile执行 页面中的node节点也都添加进了文档碎片并且生成了
// 一个一个watcher 数据获取时候触发get绑定watcher 
// 数据被修改时候触发notify通知watcher更新也就是触发自身的update函数


function ShuaiBi(options={}){
	//将属性挂载在$option上
	this.$options=options;
	//var data是为了等下处理 this._data是放到实例上
	var data=this._data=this.$options.data;
	observe(data);
	//数据代理
	for(let key in data){
		Object.defineProperty(this,key,{
			enumerable:true,
			get(){
				return this._data[key]
			},
			set(newVal){
				this._data[key]
			}
		})
	}
	new Compile(options.el,this)
}
//解析 初始化模版让{{}}变成data里的是值
function Compile(el,vm){
	vm.$el=document.querySelector(el);
	//文档碎片
	let fragment=document.createDocumentFragment()
	//将child放进文档碎片
	while(child=vm.$el.firstChild){
		fragment.appendChild(child)
	}
	replace(fragment)
	function replace(fragment){
		Array.from(fragment.childNodes).forEach(item=>{
			let text=item.textContent;
			let reg=/\{\{(.*)\}\}/;
			//如果是文本
			if(item.nodeType==3&&reg.test(text)){
				// console.log(RegExp.$1);//a.a   b
				let arr=RegExp.$1.split('.');//[a,a]
				let val=vm;
				arr.forEach(i=>{//取到this.a.a
					val=val[i]
				})
				//这个时候已经把wathcer添加进了Dep订阅者容器的subs
				new Watcher(vm,RegExp.$1,function(newVal){
					item.textContent=text.replace(/\{\{(.*)\}\}/,newVal)
				})
				item.textContent=text.replace(/\{\{(.*)\}\}/,val)
			}
			//如果是元素
			if(item.nodeType==1){
				let nodeAtrrs=item.attributes;//获取dom节点属性
				Array.from(nodeAtrrs).forEach(function(attr){
					let name=attr.name;//type="text" type
					let exp=attr.value;//v-model="b" b
					if(name.indexOf('v-')==0){//判断是否是v-开头的 属性名
						item.value=vm[exp].a
					}
					new Watcher(vm,exp,function(newVal){
						item.value=newVal
					})
					item.addEventListener('input',function(e){
						let newVal=e.target.value;
							vm[exp].a=newVal
					})
				})
			}
			if(item.childNodes){
				replace(item)
			}
		})
	}
	
	vm.$el.appendChild(fragment);
}

//观察对象给对象增加Object.definedProperty
function observe(data){
	let dep=new Dep()
	if(typeof data !='object')return;
	for(let key in data){
		let val=data[key]
		observe(val)
		Object.defineProperty(data,key,{
			enumerable:true,
			get(){
				Dep.target&&dep.addSub(Dep.target)
				return val;
			},
			set(newVal){
				if(newVal===val){
					 return;
				}
				val=newVal;
				//设置的新值也需要被劫持
				observe(newVal);
				dep.notify();
			}
		})
	}
}

//订阅者仓库
function Dep(){
	this.subs=[]
}
//订阅
Dep.prototype.addSub=function(sub){
	this.subs.push(sub);
}
//通知更新
Dep.prototype.notify=function(){
	this.subs.forEach(sub=>{
		sub.update()
	})
}
//订阅者
function Watcher(vm,RegExp,fn){
	this.fn=fn;
	this.vm=vm;
	this.RegExp=RegExp;
	Dep.target=this;
	//获取到this.a.a  这里会触发get
	let val=vm;
	let arr=RegExp.split('.');
	arr.forEach(function(k){
		val=val[k]
	})
	
	Dep.target=null 
	this.val=val //数据等下给update用
	
}
Watcher.prototype.update=function(){
	let val=this.vm;
	let arr=this.RegExp.split('.');
	arr.forEach(function(k){
		val=val[k]
	})
	this.fn(val)
}
