## Scene场景

```js
// 创建一个场景
const scene = new THREE.Scene();
```

### add

```js
// 添加一个球体
const sphereGeometry = new THREE.SphereGeometry(1,10,10);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 3;
sphere.position.y = -1;

scene.add(sphere);
```

### remove

```js
scene.remove(sphere)
```

### getObjectByName

```js
sphere.name = 'sphere'

console.log(scene.getObjectByName('sphere'))
```

### children

```js
console.log(scene.children)
```

### fog

```js
// 实现雾化
scene.fog =  new THREE.Fog(0xffffff, 1, 50)
```

### overrideMaterial

强制场景中所有对象使用相同材质

```js
scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
```

## 几何体

```js
// 添加一个球体
const sphereGeometry = new THREE.SphereGeometry(1,10,10);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
```

### 直接赋值

```js
sphere.position = new THREE.Vector3(0 ,0 ,0)
sphere.rotation = new THREE.Vector3(0.5 * Math.PI ,0 ,0)
sphere.scale = new THREE.Vector3(2 ,0 ,0)
```

### 单个赋值

```js
sphere.position.x = 0
sphere.rotation.x =  0.5 * Math.PI
sphere.scale.x = 2
```

### 方法赋值

```js
sphere.position.set(0, 0, 0)
sphere.rotation.set(0.5 * Math.PI, 0, 0)
sphere.scale.set(2, 0, 0)
```

