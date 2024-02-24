<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 导入glft加载器
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
// 引入draco解码器
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'

// 创建一个场景
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

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

// 实例化gltf加载器
const gltfLoader = new GLTFLoader()

// 实例化draco解码器
const dracoLoader = new DRACOLoader()
// 设置解码器路径
dracoLoader.setDecoderPath('./draco/')
// 设置解码器
gltfLoader.setDRACOLoader(dracoLoader)

// 加载模型
gltfLoader.load('./models/LittlestTokyo.glb', (gltf) => {
  console.log(gltf,'gg')
  const model = gltf.scene;
  model.position.set( 1, 1, 0 );
  model.scale.set( 0.01, 0.01, 0.01 );
  scene.add( model );
})
// 创建场景指数fog
scene.fog = new THREE.FogExp2(0x999999, 0.1)
scene.background = new THREE.Color(0x999999)

function animate () {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
</script>

<template>
</template>

<style scoped>
</style>
