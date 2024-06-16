<script setup>
import * as THREE from 'three'
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js'
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

// 轨道
const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 1
controls.maxDistance = 50

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 3) // 创建环境光
scene.add(ambientLight) // 将环境光添加到场景

const spotLight = new THREE.SpotLight(0xffffff, 5) // 创建聚光灯
spotLight.position.set(200, 200, 200)
spotLight.castShadow = true
scene.add(spotLight)

// 创建虚拟的场景
const imgs = [
    'src/assets/sky/right.jpg',
    'src/assets/sky/left.jpg',
    'src/assets/sky/top.jpg',
    'src/assets/sky/bottom.jpg',
    'src/assets/sky/front.jpg',
    'src/assets/sky/back.jpg'
]

const mats = []
for (let i = 0; i < imgs.length; i++) {
  mats.push(new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(imgs[i]),
    side: THREE.DoubleSide,
  }))
}

const skyBoxGeometry = new THREE.BoxGeometry(100, 100, 100);
// 为每个面分配材质索引
for (let i = 0; i < 6; ++i) {
  skyBoxGeometry.addGroup(i * 4, 4, i);
}
const skyBox = new THREE.Mesh(skyBoxGeometry, mats);
scene.add(skyBox);

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
