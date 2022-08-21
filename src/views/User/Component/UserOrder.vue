<template>
  <div class="userOrder" style="min-height: 400px">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">全部订单</el-menu-item>
      <el-menu-item index="2">待付款</el-menu-item>
      <el-menu-item index="3">待发货</el-menu-item>
      <el-menu-item index="4">已发货</el-menu-item>
      <el-menu-item index="5">待评价</el-menu-item>
      <el-menu-item index="6">已关闭</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {}
</script>
<style  lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
</style>
