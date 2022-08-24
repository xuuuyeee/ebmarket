<template>
  <div class="userOrder" style="min-height: 400px">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="selection" placeholder="筛选订单状态">
          <el-option label="全部" value="0" />
          <el-option label="待平台发货" value="1" />
          <el-option label="平台已发货" value="2" />
          <el-option label="订单已完成" value="3" />
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-input v-model="searchText" placeholder="输入订单编号搜索"/>
      </el-col>
    </el-row>

    <el-table
      :data="tableDataComputed"
      stripe
      border
      style="width: 100%;margin-top: 10px"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="收件人：">
              <p>{{ props.row.consignee }}</p>
            </el-form-item>
            <br/>
            <el-form-item label="收件电话：">
              <p>{{ props.row.telephone }}</p>
            </el-form-item>
            <br/>
            <el-form-item label="收件地址：">
              <p>{{ props.row.position }}</p>
            </el-form-item>
          </el-form>
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
      <el-table-column label="操作" min-width="150px">
        <template v-slot="scope">
          <el-button size="mini" type="success" @click="getOrderDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="warning" @click="receiveProduct(scope.$index, scope.row)" :disabled="scope.row.state !== 2">确认收货</el-button>
          <el-button size="mini" type="primary" @click="handleReturn(scope.$index, scope.row)" :disabled="!(scope.row.state === 3 || scope.row.state === 4)">退货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="填写退货信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="退货原因" :label-width="formLabelWidth">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitReturn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import orderApi from '@/api/OrderApi'
import { parseTime } from '@/utils'
import returnOrderApi from '@/api/ReturnOrderApi'

export default {
  data() {
    return {
      tableData: [],
      tableLoading: true,
      tableInfo: [
        { prop: 'id', label: '订单编号' },
        { prop: 'userName', label: '用户名' },
        { prop: 'state', label: '订单状态' },
        { prop: 'totalPrice', label: '总价格' },
        // { prop: 'transportName', label: '运输公司' },
        // { prop: 'transportNumber', label: '运输单号' },
        { prop: 'payment', label: '支付方式' },
        // { prop: 'payTime', label: '支付时间' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'updateTime', label: '更新时间' }
      ],
      searchText: '',
      selection: '0',
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        orderId: -1,
        reason: ''
      }
    }
  },
  computed: {
    tableDataComputed() {
      let res = this.tableData
      const s = parseInt(this.selection, 10)
      console.log(this.tableData)
      if (s === 1 || s === 2 || s === 3) {
        res = res.filter(data => data.state === s)
      }
      if (this.searchText.trim() !== '') {
        res = res.filter(data => data.id.toString().includes(this.searchText))
      }
      return res
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const userName = JSON.parse(localStorage.getItem('userInfo')).username
      this.tableLoading = true
      orderApi.getByUsername(userName).then(res => {
        console.log(res.data)
        this.tableData = res.data
        this.tableLoading = false
      }).catch(() => { this.tableData = []; this.tableLoading = false })
    },
    formatter(row, column) {
      switch (column.property) {
        case 'createTime':
          return parseTime(row[column.property])
        case 'payTime':
          return parseTime(row[column.property])
        case 'updateTime':
          return parseTime(row[column.property])
        case 'state':
          switch (row[column.property]) {
            case 0:
              return '待客户付款'
            case 1:
              return '待平台发货'
            case 2:
              return '平台已发货'
            case 3:
              return '订单已完成'
            case 4:
              return '订单已关闭'
            default:
              return row[column.property]
          }
        default:
          return row[column.property]
      }
    },
    getOrderDetail(index, row) {
      this.$router.push({ name: 'userOrderItem', query: { orderId: row.id }})
    },
    receiveProduct(index, row) {
      const orderObj = {
        id: row.id,
        state: 3
      }
      orderApi.updateOne(orderObj).then(() => {
        this.$message.success('收货成功')
        this.fetchData()
      })
    },
    handleReturn(index, row) {
      returnOrderApi.getByOrderId(row.id).then(res => {
        if (res.data.length !== 0) {
          this.$message.warning('该订单已经在退货流程中')
        } else {
          this.form.orderId = row.id
          this.form.reason = ''
          this.dialogFormVisible = true
        }
      })
    },
    submitReturn() {
      if (this.form.reason.trim() === '') {
        this.$message.warning('请填写退货原因！')
        return
      }
      returnOrderApi.takeOver(this.form.orderId, this.form.reason.trim()).then(res => {
        this.$message.success('订单申请退货成功，请耐心等待审核！')
        this.$router.push({ name: 'userReturn' })
      })
    },
    selectState(e) {
      console.log(e.srcElement.value)
    }
  }
}
</script>
<style>
.userOrder .el-table__row td:nth-child(4) {
  color: red;
}
.demo-table-expand {
  margin-left: 20px;
}
</style>
