<template>
  <div class="app-container userReturn">
    <el-row>
      <el-col :span="12">
        <el-input v-model="searchText" placeholder="输入订单编号搜索" />
      </el-col>
    </el-row>

    <el-table
      :data="tableData.filter(data => !searchText || data.orderId.toString().includes(searchText))"
      stripe
      border
      style="width: 100%;margin-top: 10px"
    >
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
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看对应订单商品</el-button>
          <el-button size="mini" type="warning" @click="handleTransport(scope.$index, scope.row)" :disabled="scope.row.state !== 1">客户发货</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import returnOrderApi from '@/api/ReturnOrderApi'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      tableData: [],
      tableLoading: true,
      tableInfo: [
        { prop: 'id', label: '退货单编号' },
        { prop: 'orderId', label: '订单编号' },
        { prop: 'userName', label: '用户名' },
        { prop: 'createTime', label: '申请时间' },
        { prop: 'reason', label: '申请原因' },
        { prop: 'state', label: '订单状态' },
        { prop: 'totalPrice', label: '退货金额' },
        { prop: 'updateTime', label: '更新时间' }
      ],
      searchText: '',
      selection: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.tableLoading = true
      returnOrderApi.getByUsername(
        JSON.parse(localStorage.getItem('userInfo')).username
      ).then(res => {
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
              return '等待平台审核'
            case 1:
              return '等待客户发货'
            case 2:
              return '等待平台收货和退款'
            case 3:
              return '退货完成'
            case 4:
              return '平台拒绝退货'
            default:
              return row[column.property]
          }
        default:
          return row[column.property]
      }
    },
    handleEdit(index, row) {
      this.$router.push({ name: 'userOrderItem', query: { orderId: row.orderId }})
    },
    handleTransport(index, row) {
      returnOrderApi.updateOne({
        id: row.id,
        state: 2
      }).then(res => {
        this.$message.success('客户已退货，等待平台收货与退款')
        this.fetchData()
      })
    }
  }
}
</script>

<style>
.userReturn .el-table__row td:nth-child(6) {
  color: red;
}
</style>

