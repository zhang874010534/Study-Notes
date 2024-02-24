<script setup>
import * as THREE from 'three'
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
import * as TWEEN from '@tweenjs/tween.js'

// 创建一个场景
const scene = new THREE.Scene();

// 创建一个相机 视点
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// 设置相机的位置
camera.position.set(0,0,20);

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 添加一个立方体
// 定义了一个立方体的对象
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

// 创建材质
const lambert = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const cube = new THREE.Mesh(cubeGeometry, lambert)
cube.rotation.set(0.4, 0.4, 0)
cube.position.x = -10
cube.name = 'cube'
// 添加到场景里
scene.add(cube)

const sphereGeometry = new THREE.SphereGeometry(4, 10, 10)

const sphere = new THREE.Mesh(sphereGeometry, lambert)
sphere.name = 'sphere'
scene.add(sphere)
// 添加灯光
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-10,10,90);
scene.add(spotLight);

document.onclick = function (event) {
  // 获取到设备坐标
  const x = (event.clientX / window.innerWidth) * 2 - 1
  const y = -(event.clientY / window.innerHeight) * 2 - 1

  // 创建设备坐标
  const standardVector = new THREE.Vector3(x, y, 0.5)

  // 转化为世界坐标
  const worldVector = standardVector.unproject(camera)

  // 做序列化
  const ray = worldVector.sub(camera.position).normalize()

  // 如何实现点击选中
  // 射线发射器
  const raycaster = new THREE.Raycaster(camera.position, ray)
  console.log(scene.children, 'scene.children')
  // 返回射线碰撞到的物体
  const intersects = raycaster.intersectObject(scene.children, true)
  let point3d = null
  if (intersects.length > 0) {
    point3d = intersects[0]
  }

  if (point3d) {
    console.log(point3d.object)
  }
}

const animation = () => {
  // 渲染
  renderer.render(scene, camera);

  requestAnimationFrame(animation);
}
animation()

</script>

<template>
</template>

<style scoped>
</style>
