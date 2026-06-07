<script setup></script>
<template>
  <div class="page-header">
    <div class="header-left">
      <slot name="left"></slot>
    </div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}
</style>
