<script setup>

import {useUrlHandle} from '@/common/js/useUrlHandle.js'
import {setVarStyle} from '@/utils/util.js'
import {common} from '@/common/js/common.js'

// url里的参数设置到缓存中
const {setLocalStorage} = useUrlHandle()
setLocalStorage()

// 主题
const getThemeConfig = () => {
  common.axios({
    url: 'color/config',
  }).then(res => {
    if (res.dictKey === 'BLUE') {
      setVarStyle('--el-color-primary', '#0273c3')
      setVarStyle('--el-color-primary-light-9', '#ecf5ff')
      setVarStyle('--el-color-primary-light-5', '#a0cfff')
      setVarStyle('--el-color-primary-light-3', '#79bbff')
    } else {
      setVarStyle('--el-color-primary', '#00818a')
      setVarStyle('--el-color-primary-light-9', '#f6fffd')

      // button plain的背景色
      setVarStyle('--el-color-primary-light-5', '#86c4c7')


      // 按钮hover
      setVarStyle('--el-color-primary-light-3', '#0daab1')

      // 按钮active
      setVarStyle('--el-color-primary-dark-2', '#24949c')

      // color: var(--el-button-hover-text-color);
      // border-color: var(--el-button-hover-border-color);
      // background-color: var(--el-button-hover-bg-color);
      // setVarStyle('--el-color-primary-light-3', '#0daab1')
    }
  })

}
getThemeConfig()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss">

</style>
