<script setup>
import * as THREE from 'three'
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils'
import * as TWEEN from '@tweenjs/tween.js'
import {initControls} from '../../utils/controls/index.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'
import {FontLoader} from 'three/addons/loaders/FontLoader.js'

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
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);

// 创建材质

const lambert = new THREE.MeshLambertMaterial({ color: 0xff0000 })
const basic = new THREE.MeshBasicMaterial({ wireframe: true })

const mesh = {
  pointer: new SceneUtils.createMultiMaterialObject(cubeGeometry, [lambert, basic])
}
// 添加到场景里
scene.add(mesh.pointer)
// 添加灯光
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-10,10,90);
scene.add(spotLight);

new TWEEN.Tween(mesh.pointer.rotation).to({
  x: mesh.pointer.rotation.x + 2,
  y: mesh.pointer.rotation.y + 2,
  z: mesh.pointer.rotation.z + 2,
}, 2000).start().repeat(Infinity)


const animation = () => {
  TWEEN.update();
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
