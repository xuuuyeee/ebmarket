<template>
  <div class="good_details">
    <ul class="attrs">
      <li v-for="(obj,index) in goodDetailList" :key="index">
        <span class="dt">{{obj.name}}</span>
        <span class="dd">{{obj.content}}</span>
      </li>
    </ul>
       <el-image v-for="(item,index) in goodImageList" :key="index" :src="BaseUrl + item" style="overflow: unset;padding:0px 20% 0px 20%"></el-image>
  </div>
</template>
<script>
import { BaseUrl } from '@/api/util'
export default {
  props: {
    goodDetailList: Array,
    goodImageList: Array
  },
  data() {
    return {
      BaseUrl
    }
  }
}
</script>
<style lang="less" scoped>
  .good_details{

    padding: 60px 10% 40px 10%;
    .attrs{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-bottom: 30px;
      li{
        display: flex;
        margin-bottom: 10px;
        margin-right: 50px;
        width: 40%;
        .dt{
          width: 100px;
          color: #999;
        }
        .dd{
          flex: 1;
          color: #666;
        }
      }
      >img{
            width: 100%;
        }
    }
}
</style>
