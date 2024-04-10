<script setup>
import * as THREE from 'three'
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js'
// 创建一个场景
const scene = new THREE.Scene()
scene.background = new THREE.Color("#FFFFFF")

// 创建一个相机 视点
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机的位置
camera.position.set(0, 300, 400)
camera.lookAt(new THREE.Vector3(0, 0, 0))

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 添加灯光
const spotLight = new THREE.SpotLight(0xff0000)
spotLight.position.set(2000, 8000, 4000)
scene.add(spotLight)


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

const animation = () => {
  // 渲染
  renderer.render(scene, camera)

  requestAnimationFrame(animation)
}
animation()
</script>
<template></template>
