<script setup>
import * as THREE from 'three'
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
import {initControls} from '../../utils/controls/index.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'
import {FontLoader} from 'three/addons/loaders/FontLoader.js'

const loader = new FontLoader()

loader.load('https://unpkg.com/three@0.77.0/examples/fonts/optimer_bold.typeface.json', function (font) {
  const geometry = new TextGeometry('THREE', {
    font: font,
    size: 1,
    height: 1,
    curveSegments: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
  })
  console.log(geometry, 'geometry')
  // 创建一个场景
  const scene = new THREE.Scene()

  // 创建一个相机 视点
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  // 设置 相机的位置
  camera.position.set(0, 0, 20)

  // 创建一个渲染器
  const renderer = new THREE.WebGLRenderer()
  // 设置渲染器尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // 添加一个立方体
  // 定义了一个立方体的对象
  const vertices = [
    1, 1, 1,
    -1, -1, 1,
    -1, 1, -1,
    1, -1, -1
  ]
  const indices = [
    2, 1, 0,
    0, 3, 2,
    1, 3, 0,
    2, 3, 1
  ]
  // 创建材质
  const Lambert = new THREE.MeshLambertMaterial({
    color: 0xff0000
  })
  const basic = new THREE.MeshBasicMaterial({
    wireframe: true
  })


  const mesh = {
    pointer: new SceneUtils.createMultiMaterialObject(geometry, [Lambert, basic])
  }
  // 添加到场景里
  scene.add(mesh.pointer)

  // 添加灯光
  const spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(-10, 10, 10)
  scene.add(spotLight)

  initControls(geometry, camera, mesh, scene)
  const animation = () => {
    mesh.pointer.rotation.x += 0.01
    mesh.pointer.rotation.y += 0.01

    // 渲染
    renderer.render(scene, camera)

    requestAnimationFrame(animation)
  }
  animation()
})

</script>

<template>
</template>

<style scoped>
</style>
