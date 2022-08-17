<template>
  <div class="pannel">
    <router-link
      href="javascript:;"
      v-for="item in goodsData"
      :key="item.name"
      :class="[item.price ? 'cyan' : 'white']"
      :to="`/product/${item.id}`"
    >
      <el-image :src="baseurl + item.mainImagePosition[0]" />
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
  justify-content: space-between;
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
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
    .name {
      margin: 12px 0 10px;
      font-size: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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
    background-color: #f0f9f4;
  }
  .white {
    background-color: #fff;
  }
}
</style>
