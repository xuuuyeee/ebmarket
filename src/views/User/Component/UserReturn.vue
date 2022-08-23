<template>
  <div class="app-container">
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
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">处理</el-button>
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
        { prop: 'id', label: '编号' },
        { prop: 'orderId', label: '订单编号' },
        { prop: 'userName', label: '用户名' },
        { prop: 'createTime', label: '申请时间' },
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
      returnOrderApi.getList().then(res => {
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
              return '待审核'
            case 1:
              return '待收货'
            case 2:
              return '已收货'
            case 3:
              return '已退款'
            case 4:
              return '已关闭'
            default:
              return row[column.property]
          }
        default:
          return row[column.property]
      }
    },
    handleEdit(index, row) {
      this.$router.push({ name: 'ReturnOrderEdit', query: { id: row.id }})
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: orange;
}
</style>

