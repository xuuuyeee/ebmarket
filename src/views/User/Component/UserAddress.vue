<template>
  <div class="userAddress" style="min-height: 400px">
    <el-table :data="addressTable">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column width="100" label="收货人">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.consignee"
            :disabled="canNotChange !== scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="150" label="收货人电话">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.telephone"
            :disabled="canNotChange !== scope.$index"
            @blur="judgePho(scope.row.telephone)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="500" label="地址">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.position"
            :disabled="canNotChange !== scope.$index"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="canNotChange = scope.$index"
            v-if="canNotChange === -1"
          >编辑
          </el-button
          >
          <el-button
            size="mini"
            @click="edit(scope.$index, scope.row)"
            v-else-if="canNotChange === scope.$index"
          >提交
          </el-button
          >
          <el-button size="mini"
type="danger"
@click="del(scope.$index)"
          >删除
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-form
      :inline="true"
      :model="consigneeInfo"
      class="demo-form-inline"
      style="margin-top: 30px"
    >
      <el-form-item label="审批人：">
        <el-input
          v-model="consigneeInfo.consignee"
          placeholder="收货人姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码：">
        <el-input
          v-model="consigneeInfo.telephone"
          placeholder="收货人电话"
          @blur="judgePho(consigneeInfo.telephone)"
        ></el-input>
      </el-form-item>
      <el-col :span="10"
      >
        <el-form-item label="收货人地址:">
          <el-input
            v-model="consigneeInfo.position"
            placeholder="收货人地址"
            style="width: 300px"
          ></el-input>
        </el-form-item
        >
      </el-col>
    </el-form>
    <el-button @click="addPosition" type="primary">添加收货人地址</el-button>
  </div>
</template>
<script>
import service from '@/api'

export default {
  created() {
    service({
      url: '/address/getByUser',
      method: 'GET',
      params: {
        id: JSON.parse(localStorage.getItem('userInfo')).id
      }
    }).then((res) => {
      this.addressTable = Array.from(res.data)
    })
  },
  data() {
    return {
      addressTable: [],
      canNotChange: -1,
      consigneeInfo: {
        consignee: '',
        telephone: '',
        position: ''
      }
    }
  },
  methods: {
    del(index) {
      // console.log(index)
      service({
        url: '/address',
        method: 'DELETE',
        params: {
          id: this.addressTable[index].id
        }
      }).then((res) => {
        if (res.data === true) {
          this.$nextTick(() => this.addressTable.splice(index, 1))
          this.$message.success('一条收货人信息已被删除')
        }
      })
    },
    edit(index, row) {
      const consignee = row.consignee
      const telephone = row.telephone
      const position = row.position
      service({
        url: '/address',
        method: 'PUT',
        data: {
          consignee,
          telephone,
          position,
          id: this.addressTable[index].id
        }
      }).then((res) => {
        if (res.code === 1) {
          this.$message.success('一条收货人信息修改已完成')
          this.canNotChange = -1
        }
      })
    },
    judgePho(phone) {
      const judPhone = /^[1][3-9][0-9]{9}$/
      if (!judPhone.test(phone)) {
        this.$message.warning('请输入正确的电话号码')
      }
    },
    addPosition() {
      if (this.consigneeInfo.consignee.length === 0 || this.consigneeInfo.position.length === 0) {
        this.$message.warning('电话、收件人地址、收件人姓名不能为空!')
        return
      }
      service({
        url: '/address',
        method: 'POST',
        data: {
          consignee: this.consigneeInfo.consignee,
          telephone: this.consigneeInfo.telephone,
          position: this.consigneeInfo.position,
          userId: JSON.parse(localStorage.getItem('userInfo')).id
        }
      }).then((res) => {
        this.$message.success('地址添加完成')
        this.addressTable.push({
          ...this.consigneeInfo
        })
      }).finally(() => {
        this.consigneeInfo.consignee = ''
        this.consigneeInfo.telephone = ''
        this.consigneeInfo.position = ''
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

/deep/ .cell {
  text-align: center;
}
</style>
