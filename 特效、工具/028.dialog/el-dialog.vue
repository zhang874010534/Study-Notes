<template>
  <div class="button-wrapper">
    <el-button type="primary" size="mini" class="button-class" @click="showDialog">{{title}}</el-button>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="formState" label-width="80px" label-suffix=":" size="mini">
        <el-form-item label="题目">
          <el-input v-model="formState.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="mini">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="80%"
    >
      <div class="dialog-wrapper">
        <div class="table-wrapper">
          <el-table
              :data="tableData"
              style="width: 100%"
              height="100%"
              border
              v-loading="tableLoading"
          >
            <el-table-column
                type="index"
                width="50"
                label="序号"
            >
            </el-table-column>
            <el-table-column prop="materialName" label="名称"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
        </div>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationConfig.currentPage"
            :page-sizes="[20, 40]"
            :page-size="paginationConfig.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationConfig.total"
            style="position: static"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {Button, Dialog, Form, FormItem, Input} from 'element-ui'
import el
import el
import el
import el
import el
import el

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
  },
  data () {
    return {
      dialogVisible: false,
      formState: {
        name: ''
      },
      paginationConfig: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
    }
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    },
    handleCurrentChange (val) {
      this.paginationConfig.currentPage = val
      this.getTableData()
    },
    handleSizeChange (val) {
      this.paginationConfig.pageSize = val
      this.getTableData()
    },
    setDialogBody () {
      this.$nextTick(() => {
        let headerDom = document.querySelector('.set-dialog-body .el-dialog__header')
        let bodyDom = document.querySelector('.set-dialog-body .el-dialog__body')
        bodyDom.style.height = `calc(100vh - ${headerDom.clientHeight}px)`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  display: inline-block;
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

.dialog-wrapper {
  margin: -30px -20px;
  height: calc(85vh - 150px);
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  .table-wrapper {
    flex: 1;
    overflow: auto;
  }
  .el-pagination {
    padding: 20px 0;
  }
}
//.custom-dialog .el-dialog__header {
//  padding: 10px 20px;
//  font-size: 16px;
//}
//.custom-dialog .el-dialog__body {
//  padding: 4px;
//}
//.table-wrapper {
//  height: calc(90vh - 200px);
//}
</style>
