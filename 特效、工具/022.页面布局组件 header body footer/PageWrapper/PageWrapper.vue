<script setup></script>
<template>
  <div class="page-wrapper">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.page-wrapper {
  padding: 0 16px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
