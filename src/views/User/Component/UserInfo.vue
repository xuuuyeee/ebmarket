<template>
  <el-descriptions style="margin-top: 50px" title="个人信息" :column="2" border>
    <template slot="extra">
      <el-button type="primary"
size="small"
@click="changeInfo"
        >修改个人信息</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="submit"
        :disabled="canNotChange"
        >提交</el-button
      >
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      <el-input
        v-model="username"
        :placeholder="`${username}`"
        :disabled="canNotChange"
      ></el-input>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      <el-input
        v-model="telephone"
        :placeholder="`${telephone}`"
        :disabled="canNotChange"
      ></el-input>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-promotion"></i>
        邮箱
      </template>
      <el-input
        v-model="email"
        :placeholder="`${email}`"
        :disabled="canNotChange"
      ></el-input>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import service from '@/api/index'
import thisTime from '@/api/util'
import Thistime from '@/api/util'
export default {
  created() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { username, email, telephone, password } = userInfo
    this.username = username
    this.email = email
    this.telephone = telephone
    this.password = password
  },
  data() {
    return {
      username: '',
      telephone: '',
      email: '',
      canNotChange: true
    }
  },
  methods: {
    changeInfo() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '密码输入错误',
        inputType: 'password',
        inputValidator: (value) => {
          if (value != this.password) {
            return false
          }
          return true
        }
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '密码正确,允许修改个人信息'
          })
          this.canNotChange = false
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    submit() {
      const { isDeleted, isEnabled, createTime, id, role, password } = JSON.parse(
        localStorage.getItem('userInfo')
      )
      const juduserName = /^[a-zA-Z0-9-_]{6,16}$/
      const judPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      if (!(juduserName.test(this.username) && judPhone.test(this.telephone))) {
        this.$alert('修改内容不符合规定', '提示', {
          confirmButtonText: '确定'
        })
        this.$router.go(0)
        return
      }
      service({
        url: '/user/updateUser',
        method: 'PUT',
        data: {
          id,
          telephone: this.telephone,
          email: this.email,
          username: this.username
        }
      }).then((res) => {
        if (res.code == 1) {
          this.$alert('修改个人信息成功，请重新登录', '标题名称', {
            confirmButtonText: '确定'
          })
          localStorage.clear()
          this.$router.replace('/login')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
