<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// hdr加载器
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js'
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
// const dracoLoader = new DRACOLoader()
// 设置解码器路径
// dracoLoader.setDecoderPath('./draco/')
// 设置解码器
// gltfLoader.setDRACOLoader(dracoLoader)

// 加载模型
gltfLoader.load('./models/222.glb', (gltf) => {
  const model = gltf.scene;
  model.position.set( 1, 1, 0 );
  console.log(model,'model')
  scene.add( model );
  const houseMesh = model.getObjectByName('Cube002')
  const houseGeometry = houseMesh.geometry

  // 计算包围盒
  houseGeometry.computeBoundingBox()
  // 设置几何体居中
  houseGeometry.center()
  // 获取包围盒
  const box = houseGeometry.boundingBox
  // 更新世界矩阵
  houseMesh.updateWorldMatrix(true, true)
  // 更新包围盒
  box.applyMatrix4(houseMesh.matrixWorld)
  // 获取包围盒中心
  const center = box.getCenter(new THREE.Vector3)
  console.log(center, 'center')

  // 包围盒辅助器
  const boxHelper = new THREE.Box3Helper(box, 0xffff00)
  scene.add(boxHelper)
  console.log(box, ' box')

  // 获取包围球
  const boxSphere = houseGeometry.boundingSphere
  boxSphere.applyMatrix4(houseMesh.matrixWorld)
  console.log(boxSphere, 'boxSphere')
  // 获取包围球辅助器
  const sphereGeometry = new THREE.SphereGeometry(boxSphere.radius, 16, 16)
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  })
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphereMesh.position.copy(boxSphere.center)
  scene.add(sphereMesh)
})
// 创建场景指数fog
scene.fog = new THREE.FogExp2(0x999999, 0.1)
scene.background = new THREE.Color(0x999999)

// 加载环境贴图
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr', (envMap) => {
  // 设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping
  // 设置环境贴图
  scene.background = envMap
  scene.environment = envMap
})


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
