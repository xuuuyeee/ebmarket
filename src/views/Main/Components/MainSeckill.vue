<template>
  <div class="pannel">
    <div class="cutdown" :style="{ 'display' : (pics[0].price ? 'block' : 'none' ) }"></div>
    <a href="javascript:;" v-for="item in pics" :key="item.imgSrc" :style="{ 'padding-top' : (item.price) ? '20px' : '0'}">
      <div class="seckill" v-if="item.price">
        <div class="img-box">
          <img :src="item.imgSrc" />
        </div>
        <p class="name">{{ item.name }}</p>
        <p class="percent">
          <span class="inner" style="width: 30%"></span>
        </p>
        <p class="price">
          <span><small>￥</small>{{ item.price }}</span>
          <span><small>￥</small>{{ item.oldPrice }}</span>
        </p>
      </div>
      <div class="brand" v-if="!item.price">
        <img :src="item.imgSrc" />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'MainSeckill',
  props: {
    pics: Array
  }
}
</script>

<style lang="less" scoped>
  .pannel {
    display: flex;
    justify-content: space-between;
    .cutdown {
      width: 240px;
      height: 305px;
      line-height: 1;
      text-align: center;
      color: #fff;
      background-image: url('@/assets/images/seckill.jpg');
      background-size: 240px;
    }
    a {
      display: flex;
      flex-direction: column;
      width: 240px;
      height: 305px;
      background-color: #fff;
      &:hover {
        color: #c81623;
      }
      .seckill {
        text-align: center;
        .img-box {
          width: 100%;
          height: 174px;
          padding: 0 33px;
          img {
            max-width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
        .name {
          margin: 20px 0 12px;
          font-size: 18px;
        }
        .percent {
          width: 165px;
          height: 6px;
          margin: 0 auto 12px;
          border-radius: 6px;
          background-color: #e2e2e2;
          .inner {
            display: block;
            height: 100%;
            border-radius: 6px;
            background-color: #d54847;
          }
        }
        .price {
          font-size: 20px;
          span {
            &:first-child {
              color: #9a2e1f;
              margin-right: 8px;
            }
            &:last-child {
              font-size: 16px;
              color: #999;
              text-decoration: line-through;
            }
            small {
              font-size: 80%;
            }
            }
        }
      }
      .brand {
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
</style>
