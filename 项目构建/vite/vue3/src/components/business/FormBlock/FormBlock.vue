<template>
  <div class="form-block">
    <div class="block-title">
      <div class="vertical-bar"></div>
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.block-title {
  display: flex;
  align-items: center;
  .vertical-bar {
    width: 3px;
    height: 16px;
    background: var(--el-color-primary);
    margin-right: 8px;
  }
}

</style>
