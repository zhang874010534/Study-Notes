<script setup>
import * as THREE from 'three'
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js'
// 引入 TrackballControls
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
// 第一视角
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls'
// 飞行控件
import {FlyControls} from 'three/examples/jsm/controls/FlyControls.js'
// 轨道控件
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const clock = new THREE.Clock()
// 创建一个场景
const scene = new THREE.Scene()
scene.background = new THREE.Color("#FFFFFF")

// 创建一个相机 视点
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机的位置
camera.position.set(100, 100, 0)
camera.lookAt(new THREE.Vector3(0, 0, 0))


// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()

// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 需要在 camera 和 renderer.domElement 都被创建之后才初始化的。
// const trackBall = new TrackballControls(camera,renderer.domElement)
// trackBall.rotateSpeed = 1.0 //相机的旋转速度
// trackBall.zoomSpeed = 1.0 //相机的缩放速度
// trackBall.panSpeed = 1.0 //相机的平移速度
// trackBall.staticMoving = true //关闭拖拽惯性移动

// 第一视角
// const controls = new FirstPersonControls(camera, renderer.domElement)
// controls.movementSpeed = 150;
// controls.lookSpeed = 0.1;

// 飞行视角
// const controls = new FlyControls(camera, renderer.domElement)
// controls.rollSpeed = 0.5
// 轨道
const controls = new OrbitControls(camera, renderer.domElement)
const mtlLoader = new MTLLoader()
mtlLoader.load('src/assets/city.mtl', (materials) => {
  console.log(materials)
  materials.preload()
  const objLoader = new OBJLoader()
  objLoader.setMaterials(materials)
  objLoader.load('src/assets/city.obj', (mesh) => {
    console.log(mesh)
    scene.add(mesh)
  })
})

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 3) // 创建环境光
scene.add(ambientLight) // 将环境光添加到场景

const spotLight = new THREE.SpotLight(0xffffff, 5) // 创建聚光灯
spotLight.position.set(200, 200, 200)
spotLight.castShadow = true
scene.add(spotLight)

const animation = () => {
  // trackBall.update()
  controls.update(clock.getDelta())
  // 渲染
  renderer.render(scene, camera)

  requestAnimationFrame(animation)
}
animation()
</script>
<template></template>
