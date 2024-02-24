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


const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
const parentMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
// 设置线框模式
parentMaterial.wireframe = true

let parentCube = new THREE.Mesh(geometry, parentMaterial)
parentCube.position.set(-3, 0 ,0)
// parentCube.scale.set(2, 2, 2)

const cube = new THREE.Mesh(geometry, material)
cube.position.set(3, 0, 0)
cube.scale.set(2, 2, 2)
cube.rotation.x = Math.PI / 4

parentCube.add(cube)
scene.add(parentCube)

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

// 控制立方体位置
// gui.add(cube.position, 'x', -5, 5)
const folder = gui.addFolder('立方体位置').onChange(val => {
  console.log(val)
})
folder.add(cube.position, 'x').min(-5).max(5).step(1).onFinishChange(val => {
  console.log(val, 'finish了')
})
folder.add(cube.position, 'y').min(-5).max(5).step(1)
folder.add(cube.position, 'z').min(-5).max(5).step(1)
folder.add(parentMaterial, 'wireframe')

const colorParams = {
  cubeColor: '#ff0000'
}
gui.addColor(colorParams, 'cubeColor').onChange(val => {
  cube.material.color.set(val)
})
</script>
<style scoped>
</style>
