<template>
  <div id="nav">
    <Suspense>
      <template #default>
        <async-show></async-show>
      </template>
      <template #fallback>
        <h1>loading.....</h1>
      </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import { defineComponent,onErrorCaptured,reactive,ref,toRefs,watch} from 'vue'
import AsyncShow from './AsyncShow.vue'
export default defineComponent({
  components:{
    'async-show':AsyncShow
  },
  setup() {
    onErrorCaptured((e:any) => {
      console.log(e)
    })
  },
})
</script>