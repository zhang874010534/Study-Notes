<template>
  <router-view v-slot="{ Component }" v-if="flag">
    <keep-alive :include="include">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!--<div v-else> 加载中.... </div>-->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkOrderStore } from '@/stores/module/workOrder'
import { getAuth } from 'views/workOrder/api'

const route = useRoute()
const router = useRouter()
const include = ref([])
if (route.meta.keepAlive) {
  include.value.push(route.name)
}
router.beforeEach(async to => {
  if (to.meta.keepAlive) {
    if (!include.value.includes(to.name)) {
      include.value.push(to.name)
    }
  }
})

let flag = ref<boolean>(false)
getAuth({
  showLoading: true,
  params: {
    pidList: '10839653078701',
  },
}).then(res => {
  if (res.length > 0) {
    useWorkOrderStore().setPermission(res[0].children)
  }
  flag.value = true
})
</script>
