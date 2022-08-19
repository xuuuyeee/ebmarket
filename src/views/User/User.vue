<template>
  <el-container class="wrapper" style="margin-top: 30px; margin-bottom: 30px">
    <el-aside width="200px" style="background-color: #fff; margin-right: 20px">
        <ul>
          <li><router-link to="userInfo" :class="{active: isActive == 1}" @click.native="isActive = 1">个人信息</router-link></li>
          <li><router-link to="userSafe" :class="{active: isActive == 2}" @click.native="isActive = 2">账号安全</router-link></li>
          <li><router-link to="userAddress" :class="{active: isActive == 3}" @click.native="isActive = 3">收货人管理</router-link></li>
          <li><router-link to="#" :class="{active: isActive == 4}" @click.native="isActive = 4">我的订单</router-link></li>
          <li><router-link to="/cart">我的购物车</router-link></li>
        </ul>
    </el-aside>
    <el-main style="background-color: #fff">
      <router-view>

      </router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      isActive: 1
    }
  }
};
</script>
<style lang="less" scoped>
  ul{
    li{
      margin: 30px 40px;
      font-size: 20px;
      .active{
        color: #17bb9b;
      }
    }
  }
</style>