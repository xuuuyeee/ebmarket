<template>
  <div class="pannel">
    <div class="img-box">
      <a href="javascript:;">
        <img :src="LeftImg[0].imgSrc" alt="">
      </a>
    </div>
    <ul>
      <li v-for="item in goodsData" :key="item.name">
        <a href="javascript:;">
          <div class="pic">
            <img :src="item.imgSrc"/>
          </div>
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="class">{{ item.class }}</p>
            <p class="price"><small>￥</small>{{ item.price }}</p>
          </div>
          <div class="extra">
            <p>找相似</p>
            <p>发现更多宝贝</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainFloor',
  props: {
    LeftImg: Array,
    goodsData: Array
  }
}
</script>

<style lang="less" scoped>
  .pannel {
    display: flex;
    justify-content: space-between;
    .img-box {
      img {
        width: 240px;
        height: 610px;
        vertical-align: middle;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-left: 10px;
      li {
        position: relative;
        width: 240px;
        height: 300px;
        padding-top: 10px;
        background-color: #fff;
        border: 1px solid #fff;
        overflow: hidden;
        transition: 0.3s;
        a {
          .pic {
            width: 100%;
            height: 160px;
            padding: 0 33px;
            img {
              max-width: 100%;
              max-height: 100%;
              vertical-align: middle;
            }
          }
          .info {
            height: 130px;
            padding: 10px 22px 0;
            line-height: 1.3;
            font-size: 19px;
            .price {
              position: absolute;
              bottom: 10px;
              font-size: 22px;
              color: #9a2e1f;
              small {
                font-size: 80%;
              }
            }
          }
          .extra {
            width: 100%;
            height: 86px;
            padding-top: 10px;
            transition: bottom .3s;
            background-color: #5eb69c;
            position: absolute;
            bottom: -86px;
            p {
              width: 124px;
              padding: 9px 0 8px;
              margin: 0 auto;
              line-height: 1;
              text-align: center;
              font-size: 19px;
              color: #fff;
              &:last-child {
                font-size: 13px;
                border-top: 1px solid #fff;
              }
            }
          }
        }
        &:hover {
          border: 1px solid #5eb69c;
          .extra {
            bottom: 0;
          }
        }
      }
    }
  }
</style>
