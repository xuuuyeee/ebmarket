<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-input v-model="searchText" placeholder="输入编号搜索" />
      </el-col>
    </el-row>

    <el-table
      :data="tableData.filter(data => !searchText || data.id.toString().includes(searchText))"
      stripe
      border
      style="width: 100%;margin-top: 10px"
    >
      <el-table-column label="预览图">
        <template v-slot="scope">
          <el-image style="width: 100px; height: 100px" :src="pictureBaseURL + scope.row.productPicture" lazy />
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item,index) in tableInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :formatter="formatter"
        sortable
        show-overflow-tooltip
      />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="handleDialog(scope.$index, scope.row)">添加评价</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="商品评价" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品评级" :label-width="formLabelWidth">
          <el-rate v-model="form.level" style="padding-top: 10px"/>
        </el-form-item>
        <el-form-item label="评价内容" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitComment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import orderItemApi from '@/api/OrderItemApi'
import { parseTime } from '@/utils'
import { BaseUrl } from '@/api/util'
import commentApi from '@/api/CommentApi'

export default {
  data() {
    return {
      tableData: [],
      tableLoading: true,
      tableInfo: [
        { prop: 'id', label: '编号' },
        { prop: 'productName', label: '商品名' },
        { prop: 'attributeValue', label: '商品名' },
        { prop: 'count', label: '数量' },
        { prop: 'singlePrice', label: '单价' },
        { prop: 'totalPrice', label: '总价' }
      ],
      searchText: '',
      selection: null,
      orderId: 0,
      pictureBaseURL: BaseUrl,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        itemId: -1,
        productId: -1,
        level: 5,
        description: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.orderId = this.$route.query.orderId
      if (this.orderId === undefined || this.orderId === null) {
        this.$router.push({ name: 'userOrder' })
      }

      this.tableLoading = true
      orderItemApi.getOrderItem(this.orderId).then(res => {
        console.log(res.data)
        this.tableData = res.data
        this.tableLoading = false
      }).catch(() => { this.tableData = []; this.tableLoading = false })
    },
    formatter(row, column) {
      switch (column.property) {
        case 'createTime':
          return parseTime(row[column.property])
        case 'updateTime':
          return parseTime(row[column.property])
        default:
          return row[column.property]
      }
    },
    handleDialog(index, row) {
      console.log(row)
      this.form.itemId = row.id
      this.form.productId = row.productId
      this.form.level = row.level
      this.form.description = row.description
      this.dialogFormVisible = true
    },
    submitComment() {
      const form = this.form
      if (form.itemId === -1) { return }
      if (form.level === 0) { this.$message.warning('请填写商品评级'); return }
      if (form.description.trim() === '') { this.$message.warning('请填写评价内容'); return }
      const commentObj = {
        userId: JSON.parse(localStorage.getItem('userInfo')).id,
        orderId: this.orderId,
        productId: form.productId,
        orderItemId: form.itemId,
        username: JSON.parse(localStorage.getItem('userInfo')).username,
        level: form.level,
        description: form.description
      }
      commentApi.addOne(commentObj).then(res => {
        this.$message.success('评价成功!')
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: orange;
}
</style>

