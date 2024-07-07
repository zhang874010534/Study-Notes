<template>
  <div class="page-wrapper">
    <div class="page-header">
      <div class="header-left">
        <span class="label">label名字</span>
        <el-select size="mini" multiple clearable  v-model="condition.demo2" placeholder="全部" @change="getTableData">
          <el-option
              v-for="item in []"
              :key="item.key"
              :label="item.name"
              :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="header-right">
        11
      </div>
    </div>
    <div class="page-body">
      <el-table
          :data="tableData"
          style="width: 100%"
          height="100%"
          border
          v-loading="tableLoading"
      >
        <el-table-column prop="demo1" label="名字1"></el-table-column>
        <el-table-column prop="clientType" label="名字2"></el-table-column>
        <el-table-column
            label="操作"
            width="120"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" style="color: #f56c6c;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<el-pagination-->
    <!--    background-->
    <!--    @size-change="handleSizeChange"-->
    <!--    @current-change="handleCurrentChange"-->
    <!--    :current-page="paginationConfig.currentPage"-->
    <!--    :page-sizes="[20, 40]"-->
    <!--    :page-size="paginationConfig.pageSize"-->
    <!--    layout="total, sizes, prev, pager, next, jumper"-->
    <!--    :total="paginationConfig.total">-->
    <!--</el-pagination>-->
  </div>
</template>
<script>
import {Table, TableColumn, Input, Button, Dialog, Form, FormItem, Select, Option, Pagination} from 'element-ui'
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Input.name]: Input,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [Pagination.name]: Pagination
  },
  data () {
    return {
      tableData: [
        {
          demo1: '测试'
        }
      ],
      tableLoading: false,
      paginationConfig: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      condition: {
        demo2: []
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      console.log('1')
    },
    deleteRow (row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData([row.id])
        this.selectedList = []
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteData (list) {
      this.tableLoading = true
      axios({
        url: '',
        type: 'delete',
        data: {
          idList: list
        }
      }).then(() => {
        tipMessage('操作成功', 'success')
        this.getTableData()
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.page-wrapper {
  background-color: #fff;
  height: 100vh;
  overflow: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  .page-header {
    display: flex;
    justify-content: space-between;
    .label {
      margin: 0 4px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
  }

  .page-body {
    flex: 1;
    overflow: auto;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .el-pagination {
    text-align: center;
  }
}
.button-class {
  font-size: 13px;
  line-height: 13px;
  height: 28px;
  transform: translateY(1px);
}
.dialog-footer {
  display: flex;
  justify-content: center;
  border-top: 1px solid #d8d8d8;
  padding-top: 12px;
}
</style>
