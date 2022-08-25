<template>
  <div class="pannel">
    <router-link
      href="javascript:;"
      v-for="item in goodsData"
      :key="item.name"
      :class="[item.price ? 'cyan' : 'white']"
      :to="`/product/${item.id}`"
    >
      <el-image :src="baseurl + item.mainImagePosition[0]" style="width:306px;height:306px"/>
      <p class="name">{{ item.prodName }}</p>
      <p class="price">
        <slot name="price" :data="item.price"></slot>
      </p>
    </router-link>
  </div>
</template>

<script>
import { BaseUrl } from "@/api/util";
export default {
  name: "CommonPannel1",
  props: {
    goodsData: Array,
  },
  data() {
    return {
      baseurl: BaseUrl,
    };
  },
};
</script>

<style lang="less" scoped>
.pannel {
  display: flex;
  justify-content: left;
  gap: 14px;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 306px;
    height: 406px;
    transition: all 0.5s;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      color: #c81623;
    }
    // img {
    //   max-width: 100%;
    //   max-height: 100%;
    //   vertical-align: middle;
    // }
    .name {
      width: 100%;
      margin: 12px 20px 10px;
      padding: 0px 20px;
      font-size: 22px;
      overflow: hidden; // 溢出部分隐藏
      white-space: nowrap; // 文字不换行
      text-overflow: ellipsis; // 显示省略号
      text-align: center;
    }
    .price {
      font-size: 23px;
      color: #9a2e1f;
      small {
        font-size: 16px;
      }
    }
    .info {
      font-size: 18px;
      color: #999;
    }
  }
  .cyan {
    background-color: #d5f5e3;
  }
  .white {
    background-color: #fff;
  }
}
</style>
