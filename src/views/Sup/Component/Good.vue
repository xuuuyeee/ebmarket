<template>
   <li>
      <router-link :to="`/product/${obj.id}`" class="good_router">
        <el-image :src="BaseUrl+obj.imgSrc" style="height:160px; width:160px"></el-image>
        <p class="good_font good_name">{{obj.prodName}}</p>
        <p class="good_font good_desc">{{obj.desc}}</p>
        <p class="good_price">￥{{obj.price}}</p>
      </router-link>
   </li>
</template>
<script>
import { BaseUrl } from '@/api/util'
export default {
  props: {
    obj: Object
  },
  data() {
    return {
      BaseUrl
    }
  }
}
</script>
<style lang="less" scoped>
li{
  .good_router{
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  outline: none;
  background-color: transparent;
  .good_font{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
 }
  .good_name{
    font-size: 16px;
    padding-top: 10px;
 }
  .good_desc{
     color: #999;
     min-height: 32px;
     padding-top: 10px;
  }
  .good_price{
    color: #CF4444;
    font-size: 20px;
    padding-top: 10px;
  }
 }
 &:hover{
    transition: all 0.8s;
    transform: translate3d(0, -13px, 0);
    box-shadow: 0 3px 8px  rgba(0,0,0,0.2);
  }
}

</style>
