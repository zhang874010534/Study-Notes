<template>
  <div class="circle-filled">
      <el-icon class="primary-icon" size="25" v-if="props.type === 'plus'">
      <CirclePlusFilled/>
    </el-icon>
    <el-icon class="danger-icon" size="25" v-if="props.type === 'remove'">
      <RemoveFilled/>
    </el-icon>
  </div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'plus'
  }
})
import {CirclePlusFilled, RemoveFilled} from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped>
.circle-filled {
  display: inline-flex;
  align-items: center;
}
.primary-icon {
  color: var(--el-color-primary);
  margin-left: 4px;
  cursor: pointer;
}

.danger-icon {
  color: var(--el-color-danger);
  margin-left: 4px;
  cursor: pointer;
}

</style>
