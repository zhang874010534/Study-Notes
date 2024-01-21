<script setup></script>
<template>
  <div class="page-body">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.page-body {
  flex: 1;
  overflow: auto;
  margin-top: 8px;
}
</style>
