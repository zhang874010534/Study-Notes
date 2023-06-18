<template>
  <el-table :data="tableData" height="100%" style="width: 100%">
    <el-table-column
      :prop="item.key"
      :label="item.name"
      :width="item.width ? item.width : 0"
      v-for="(item, index) in columns" :key="index"
    >
      <template v-slot="scope">
        <slot name="bodyCell" :column="scope.column" :record="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      tableData: [],
      height: 100
    }
  },
  watch: {
    dataSource: {
      handler(newVal) {
        this.tableData = newVal
      },
      immediate: true
    }
  },
}
</script>
