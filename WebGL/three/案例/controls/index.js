const basicType = {
  color: {
    method: 'addColor',
    getValue: item => item.color.getStyle(),
    setValue: (item, value) => item.color.set(value),
  },
  groundColor: {
    method: 'addColor',
    getValue: item => item.groundColor.getStyle(),
    setValue: (item, value) => item.groundColor.set(value),
  },
  intensity: {
    method: 'add',
    extends: [0, 10],
    getValue: item => item.intensity,
    setValue: (item, value) => item.intensity = +value,
  },
  distance: {
    method: 'add',
    extends: [0, 2],
    getValue: item => item.distance,
    setValue: (item, value) => item.distance = +value,
  },
  angle: {
    method: 'add',
    extends: [0, Math.PI / 2],
    getValue: item => item.angle,
    setValue: (item, value) => item.angle = +value,
  },
  decay: {
    method: 'add',
    extends: [0, 20],
    getValue: item => item.decay,
    setValue: (item, value) => item.decay = +value,
  },
  transparent: {
    getValue: item => item.transparent,
    setValue: (item, value) => item.transparent = value,
  },
  wireframe: {
    getValue: item => item.wireframe,
    setValue: (item, value) => item.wireframe = value,
  },
  visible: {
    getValue: item => item.visible,
    setValue: (item, value) => item.visible = value,
  },
  cameraNear: {
    extends: [0, 50],
    getValue: (item, camera) => camera.near,
    setValue: (item, value, camera) => camera.cameraNear = value,
  },
  cameraFar: {
    extends: [50, 1000],
    getValue: (item, camera) => camera.far,
    setValue: (item, value, camera) => camera.cameraFar = value,
  },
}

const itemType = {
  SpotLight: ['color', 'intensity', 'distance', 'angle', 'decay'], // 聚光灯
  AmbientLight: ['color'], // 环境光
  PointLight: ['color', 'intensity', 'distance'], // 点光源
  DirectionalLight: ['color', 'intensity'], // 平行光
  HemisphereLight: ['skyColor', 'groundColor', 'intensity'], // 半球光
  MeshBasicMaterial: ['color', 'opacity', 'transparent', 'wireframe', 'visible'], // 基础材质
  MeshDepthMaterial: ['wireframe', 'cameraNear', 'cameraFar'], // 深度材质
}
function initControls (item, camera) {
  console.log(item)
  const typeList = itemType[item.type]
  if (!typeList || !typeList.length) {
    return
  }
  const controls = {
    // color: 0xffffff,
    // intensity: 1,
    // distance: 0,
    // angle: Math.PI / 3,
    // exponent: 10
    // penumbra = 0,
    // decay = 2
  }
  const gui = new dat.GUI()
  for (let i = 0; i < typeList.length; i++) {
    const type = typeList[i]
    const child = basicType[type]
    if (child) {
      controls[type] = child.getValue(item, camera)
      const childExtends = child.extends || []
      gui[child.method || 'add'](controls, type).onChange(value => {
        child.setValue(item, value, camera)
      })
    }
  }
  // gui.addColor(controls, 'color').onChange((value) => {
  //   // controls.color = value
  //   item.color.set(value)
  // })
}
