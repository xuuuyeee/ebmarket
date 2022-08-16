<template>
  <div
    style="width: 400px; height: 400px; margin: 0px auto; padding-top: 30px"
    class="userSafe"
  >
    <div>
      <label for="password">旧密码</label>
      <el-input
        type="password"
        v-model="password"
        placeholder="请输入旧密码"
        id="password"
      ></el-input>
    </div>
    <div>
      <label for="password">新密码</label>
      <el-input
        type="password"
        v-model="newpassword"
        placeholder="密码6-16位的字母、数字、下划线组成"
        id="newpassword"
        @blur="judgePwd"
      ></el-input>
    </div>
    <div>
      <label for="password">确认密码</label
      ><el-input
        type="password"
        v-model="newpasswordAg"
        placeholder="确认密码"
        id="newpasswordAg"
      ></el-input>
      <button
        class="green_button"
        style="margin-top: 30px; transform: translate(100px, 0px)"
        @click="submit()"
      >
        确认修改
      </button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  data() {
    return {
      password: "",
      newpassword: "",
      newpasswordAg: "",
    };
  },
  methods: {
    judgePwd() {
      const judRule = /^[a-zA-Z0-9-_]{6,16}$/;
      if (!judRule.test(this.newpassword)) {
        this.$message("请输入6-16位由字母、数字、下划线组成的密码");
        this.newpassword = "";
      }
    },
    submit() {
        if(this.password != JSON.parse(localStorage.getItem('userInfo')).password){
            this.$message("旧密码输入错误");
            this.newpassword = ''
            this.password = ''
            this.newpasswordAg = ''
            return
        }
        if(this.newpassword != this.newpasswordAg){
        this.newpassword = '';
        this.newpasswordAg = '';
        this.$message("两次新密码输入不一致");
        return
        }  
      service({
        url: "/user/updateUser",
        method: "PUT",
        data: {
          id: JSON.parse(localStorage.getItem('userInfo')).id,
          password: this.newpassword,
        }
      }).then(res => {
          if(res.code == 1){
            this.$message("修改密码成功，请重新登录");
            localStorage.clear();
            this.$router.replace('/login');
          }
      })
    },
  },
};
</script>
<style lang="less" scoped>
.userSafe {
  > div {
    margin-top: 20px;
  }
}
</style>