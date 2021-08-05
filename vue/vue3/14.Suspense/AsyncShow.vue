<template>
  <div>
     {{result}}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  async setup() {
    return new Promise((resolve) => {
      // 发送请求
      setTimeout(() => {
        return resolve({
          result: 42
        })
      }, 3000);
    })
  },
})
</script>
