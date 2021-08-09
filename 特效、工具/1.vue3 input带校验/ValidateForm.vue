<template>
  <form>
    <!-- 表单 -->
    <slot></slot>
    <!-- 按钮 -->
    <div @click.prevent="submitForm">
      <slot name="submit">
        <!-- 默认内容 -->
        <button type="submit">提交按钮</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent,onUnmounted,PropType, reactive } from 'vue'
import mitt from 'mitt'
type ValidateFunc = ( ) => boolean
export const emitter = mitt()
export default defineComponent({
  emit:['form-submit'],
  setup(props,context){
    let funcArr:ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    } 
    const callback = (func:any) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created',callback)
    onUnmounted(() => {
      emitter.off('form-item-created',callback)
      funcArr = []
    })

    return {
      submitForm
    }
  },
})
</script>
