<script setup>
import * as THREE from 'three';
// 创建一个场景
const scene = new THREE.Scene()

// 创建一个相机 视点
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机的位置
camera.position.set(0, 0, 40)

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 添加一个立方体
// 定义了一个立方体的对象
const geometry = new THREE.BoxGeometry(10, 10, 10)

// 创建材质
const material = new THREE.MeshPhongMaterial({
  // wireframe: true,
  map: new THREE.TextureLoader().load('src/assets/plaster.jpg')
})

const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.y = 0.5
mesh.rotation.x = -12

// 添加到场景里
scene.add(mesh)

// 创建材质
const material2 = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('src/assets/plaster.jpg'),
  normalMap: new THREE.TextureLoader().load('src/assets/plaster-normal.jpg'),
})

const mesh2 = new THREE.Mesh(geometry, material2)
mesh2.rotation.y = -0.5
mesh2.rotation.x = 12
mesh2.position.x = 15
// 添加到场景里
scene.add(mesh2)
renderer.setClearColor(0xffffff)


// 添加灯光
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // 第三个参数是光源的最大距离
pointLight.position.set(0, 5, 10); // 设置光源位置
scene.add(pointLight);

// 创建一个方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 第二个参数是光的强度，默认1
directionalLight.position.set(1, 1, 1); // 设置光源的方向，相对场景原点，默认为(0, 0, 0)
scene.add(directionalLight); // 将光源添加到场景中

const animation = () => {
  // 渲染
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}
animation()
</script>

<template>
</template>

<style scoped>
</style>
