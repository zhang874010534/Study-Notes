<template>
  <!--<div @click="clickButton" style="position: fixed;left: 0;top: 0;z-index: 2000;background: #fff">全屏</div>-->
</template>
<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js'
// 创建一个场景
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
console.log(cubeGeometry)
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
})
const cubeMaterial1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})
const cubeMaterial2 = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
})
const cubeMaterial3 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
})
const cubeMaterial4 = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: true,
})

const cubeMaterial5 = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true,
})

const cube = new THREE.Mesh(cubeGeometry, [cubeMaterial, cubeMaterial1, cubeMaterial2, cubeMaterial3, cubeMaterial4, cubeMaterial5])
cube.position.x = 2
scene.add(cube)

// 创建几何体
const geometry = new THREE.BufferGeometry()
console.log(geometry)
// 创建顶点数据 逆时针为正面 顺时针 为背面
// const vertices = new Float32Array([
//     -1.0,-1.0,0.0,
//     1.0,-1.0,0.0,
//     1.0,1.0,0.0,
//     1.0,1.0,0.0,
//     -1.0,1.0,0.0,
//     -1.0,-1.0,0.0,
// ])
// 使用索引绘制
const vertices = new Float32Array([
    -1.0,-1.0,0.0,
    1.0,-1.0,0.0,
    1.0,1.0,0.0,
    -1.0,1.0,0.0,
])

// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 创建索引
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 设置2个顶点组, 形成2个材质
geometry.addGroup(0, 3, 0)
geometry.addGroup(3, 3, 1)

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
  wireframe: true,
})
//
const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(geometry, [material, material1])
scene.add(plane)
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0)


// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05
scene.add(controls)

function animate () {
  controls.update()
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight

  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
})
const eventObj = {
  fullScreen() {
    document.body.requestFullscreen()
  },
  exitScreen() {
    document.exitFullscreen()
  }
}

const gui = new GUI()
gui.add(eventObj, 'fullScreen').name('全屏')
gui.add(eventObj, 'exitScreen')

</script>
<style scoped>
</style>
