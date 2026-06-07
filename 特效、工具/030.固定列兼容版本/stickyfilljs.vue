<template>
  <div class="page">
    <div class="table-wrap">
      <table class="my-table">
        <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>部门</th>
          <th>职位</th>
          <th>电话</th>
          <th>地址</th>
          <th class="sticky-col">操作</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="item in tableData" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.job }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td class="sticky-col">
            <button @click="edit(item)">编辑</button>
            <button @click="remove(item)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Stickyfill from 'stickyfilljs'

export default {
  name: 'StickyLastColumnTable',

  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张三',
          age: 20,
          department: '技术部',
          job: '前端开发',
          phone: '13800000001',
          address: '北京市朝阳区'
        },
        {
          id: 2,
          name: '李四',
          age: 22,
          department: '产品部',
          job: '产品经理',
          phone: '13800000002',
          address: '上海市浦东新区'
        },
        {
          id: 3,
          name: '王五',
          age: 24,
          department: '运营部',
          job: '运营专员',
          phone: '13800000003',
          address: '广州市天河区'
        }
      ]
    }
  },

  mounted() {
    this.$nextTick(() => {
      const stickyElements = this.$el.querySelectorAll('.sticky-col')
      console.log(stickyElements, 'stickyElements')
      Stickyfill.add(stickyElements)
    })
  },

  beforeDestroy() {
    const stickyElements = this.$el.querySelectorAll('.sticky-col')
    Stickyfill.remove(stickyElements)
  },

  methods: {
    edit(row) {
      console.log('编辑', row)
    },

    remove(row) {
      console.log('删除', row)
    }
  }
}
</script>

<style scoped>
.page {
  padding: 20px;
}

.table-wrap {
  width: 600px;
  overflow-x: auto;
  border: 1px solid #ddd;
}

.my-table {
  width: 1000px;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.my-table th,
.my-table td {
  width: 140px;
  padding: 10px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #fff;
  white-space: nowrap;
  text-align: left;
}

.my-table th {
  background: #f5f5f5;
}

/* 固定最后一列 */
.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  right: 0;
  width: 160px;
  min-width: 160px;
  background: #fff;
  z-index: 2;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.08);
}

/* 表头最后一列层级高一点 */
thead .sticky-col {
  background: #f5f5f5;
  z-index: 3;
}

button {
  margin-right: 6px;
}
</style>
