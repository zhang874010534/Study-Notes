### [uni.createAnimation](https://uniapp.dcloud.io/api/ui/animation?id=createanimation)

>  创建一个动画实例 [animation](https://uniapp.dcloud.io/api/ui/animation?id=animation)。调用实例的方法来描述动画。最后通过动画实例的export方法导出动画数据传递给组件的animation属性。 

想要实现多个元素都有同样的动画效果 但是都各自独立 需要在列表渲染的时候传参  ：animation让他接受数组里的数据，但是经常不行

需要经过一下animation1 不能直接

```
this.animationData[i]=this.animation.export()
```



```
data() {
			return {
				animation1:{},
				animationData:[]
			}
		},
```

```
this.animation1=this.animation;
this.animationData[i]=this.animation1.export();
```

#### 标签内加   :data-xxx=“11”

可以往event.curentTarget.dataset里存数据

### 第三方授权

微信端需要在image外面加一个<button open-type="getUserInfo" @getuserinfo="wxLogin"">

事件写在button上 open-type获取微信开放能力

App端直接点击事件写在image上 如果也button里写image，点击事件写iamge上，是点击不到image的