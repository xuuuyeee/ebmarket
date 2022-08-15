<template>
  <div class="wrapper" style="background: #fff; margin-bottom: 20px">
    <div class="header">
      <span class="title">
        <svg class="icon"><use xlink:href="#icon-xiaotuzi"></use></svg>
        同类商品推荐
      </span>
    </div>
    <el-carousel
      :interval="10000"
      height="200px"
      style="margin-top: 30px"
      indicator-position="outside"
    >
      <el-carousel-item v-for="(tmparr, index) in recList" :key="index">
        <ul style="display: flex; justify-content: center">
          <li
            v-for="(imgSrc, index) in tmparr"
            :key="index"
            style="margin: 0 30px"
          >
            <router-link to="javascript:;">
              <el-image
                :src="imgSrc"
                style="width: 190px; height: 190px"
              ></el-image>
            </router-link>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: ["recList"],
};
</script>
<style lang="less" scoped>
.header {
  height: 80px;
  line-height: 80px;
  padding: 0 20px; 
  .title{
    margin-top: 20px;
    font-size: 20px;
    padding-left: 10px;
  }
}
</style>