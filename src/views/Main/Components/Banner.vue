<template>
  <div class="banner-list">
    <div class="wrapper">
      <!-- banner图 有多少张图片就有多少个li -->
      <el-carousel class="carousel" trigger="click" height="500px">
        <el-carousel-item v-for="(picSrc, index) in item" :key="index" >
          <el-image :src="picSrc"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="list">
        <ul>
          <li>
            <a href="javascript:;">生鲜<span>水果 蔬菜</span></a>
          </li>
          <li>
            <a href="javascript:;">美食<span>面点 干果</span></a>
          </li>
          <li>
            <a href="javascript:;">餐厨<span>厨具 锅具</span></a>
          </li>
          <li>
            <a href="javascript:;">电器<span>生活电器 厨卫</span></a>
          </li>
          <li>
            <a href="javascript:;">居家<span>床品 被枕</span></a>
          </li>
          <li>
            <a href="javascript:;">洗护<span>洗发 美妆</span></a>
          </li>
          <li>
            <a href="javascript:;">孕婴<span>奶粉 玩具</span></a>
          </li>
          <li>
            <a href="javascript:;">服饰<span>女装 男装</span></a>
          </li>
          <li>
            <a href="javascript:;">杂货<span>户外 图书</span></a>
          </li>
          <li>
            <a href="javascript:;">品牌<span>品牌制造</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyBanner',
  data () {
    return {
      item: [
        'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg',
        'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/4a79180a-1a5a-4042-8a77-4db0b9c800a8.jpg'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.banner-list {
  height: 500px;
  background-color: #f5f5f5;
  .wrapper {
    position: relative;
    .list {
      position: absolute;
      left: 0;
      top: 0;
      width: 250px;
      height: 100%;
      z-index: 3000;
      ul {
        background: rgba(0, 0, 0, 0.8);
        li {
          height: 50px;
          line-height: 50px;
          a {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            padding-left: 36px;
            color: #fff;
            span {
              margin-left: 15px;
              font-size: 14px;
            }
            &:hover {
              background-color: #27ba9b;
            }
            &::after {
              position: absolute;
              top: 19px;
              right: 19px;
              content: "";
              width: 6px;
              height: 11px;
              background: url("@/assets/images/sprites.png") -80px -110px;
            }
          }
        }
      }
    }
    // .l-arrow,
    // .r-arrow {
    //   position: absolute;
    //   top: 228px;
    //   width: 45px;
    //   height: 45px;
    //   border-radius: 50%;
    //   background-color: rgba(0, 0, 0, 0.2);
    //   background-image: url("@/assets/images/sprites.png");
    // }
    // .l-arrow {
    //   left: 260px;
    //   background-position: 14px -60px;
    // }
    // .r-arrow {
    //   right: 10px;
    //   background-position: -23px -60px;
    // }
    // ol {
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    //   position: absolute;
    //   bottom: 30px;
    //   left: 680px;
    //   width: 150px;
    //   height: 10px;
    //   li {
    //     width: 10px;
    //     height: 10px;
    //     border-radius: 50%;
    //     background-color: rgba(255, 255, 255, 0.4);
    //     cursor: pointer;
    //   }
    //   .current {
    //     background-color: #fff;
    //   }
    // }
  }
}
</style>
