<template>
  <div>
    <!-- 面包屑 -->
    <div class="wrapper good_show">
      <div class="good_media">
        <div class="good_images">
          <div
            class="large_image"
            :style="{
              display: isDisplay ? 'block' : 'none',
              'background-image': `url(${goodInfo.list[selectedImageNum]})`,
              'background-positionX': `${-2 * this.layerX}px`,
              'background-positionY': `${-2 * this.layerY}px`,
            }"
          ></div>
          <div
            class="middle_image"
            @mouseenter="isDisplay = true"
            @mouseleave="isDisplay = false"
          >
            <el-image
              :src="goodInfo.list[selectedImageNum]"
              style="max-width: 100%; max_height: 100%; vertical-align: middle"
            ></el-image>
            <div
              class="image_layer"
              @mousemove="calPos($event)"
              :style="{
                display: isDisplay ? 'block' : 'none',
                left: `${layerX}px`,
                top: `${layerY}px`,
              }"
            ></div>
          </div>
          <ul class="small_image" @mouseover="checkPic($event)">
            <li
              v-for="(obj, index) in goodInfo.list"
              :class="{ active_image: selectedImageNum == index }"
              :key="index"
              :data-index="index"
            >
              <el-image
                :src="obj"
                style="
                  max-width: 100%;
                  max-height: 100%;
                  vertical-align: middle;
                "
              ></el-image>
            </li>
          </ul>
        </div>
        <ul class="good_sales"></ul>
      </div>
      <div class="spec">
        <p class="good_title">{{goodInfo.good_title}}</p>
        <p class="good_desc">{{goodInfo.good_desc}}</p>
        <p class="good_price">
          <span>{{goodInfo.good_price.toFixed(2)}}</span>
        </p>
        <div class="goods_sku">
          <dl>
            <dt>属性</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>属性</dt>
            <dd></dd>
          </dl>
        </div>
        <div style="display: flex; align-items: center">
          <div class="elInput">数量</div>
          <el-input-number size="small" v-model="good_num"></el-input-number>
        </div>

        <button class="green_button addCart" @click="addCart(good_id,good_num)">加入购物车</button>
      </div>
    </div>
    <Recommend :recList="recList" style="background-color: #fff"></Recommend>
    <div class="wrapper" style="margin-top: 20px">
      <div class="good_tabs">
        <nav>
          <a
            href="javascript:;"
            @click="
              comName = 'GoodDetail';
              isTabClick = true;
            "
            :class="{ active_tab: isTabClick }"
            >商品详情</a
          >
          <a
            href="javascript:;"
            @click="
              comName = 'GoodComment';
              isTabClick = false;
            "
            :class="{ active_tab: !isTabClick }"
            >商品评价
            <span>0</span>
          </a>
        </nav>
        <component
          :is="comName"
          :commentList="goodInfo.commentList"
          :goodDetailList="goodInfo.goodDetailList"
        ></component>
      </div>
    </div>
    <div class="good_warn wrapper">
      <h3>注意事项</h3>
      <p class="tit">• 如何申请退货?</p>
      <p>
        1.自收到商品之日起30日内，顾客可申请无忧退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账；
      </p>
      <p>2.内裤和食品等特殊商品无质量问题不支持退货；</p>
      <p>
        3.退货流程：
        确认收货-申请退货-客服审核通过-用户寄回商品-仓库签收验货-退款审核-退款完成；
      </p>
      <p>
        4.因小兔鲜儿产生的退货，如质量问题，退货邮费由小兔鲜儿承担，退款完成后会以现金券的形式报销。因客户个人原因产生的退货，购买和寄回运费由客户个人承担。
      </p>
    </div>
  </div>
</template>
<script>
import service from '@/api';
import Recommend from "../ShopCraft/Recommend/Recommend.vue";
import GoodComment from "./GoodComment.vue";
import GoodDetail from "./GoodDetail.vue";
export default {
  created(){
    // console.log(this.$route.params.sort);
    service({
      url: "/product/getOne",
      method: "GET",
      params:{
        id: this.$route.params.sort
      }
    }).then((res)=>{
        console.log(res);
    })
  },
  data() {
    return {
      goodInfo:{
        good_id: 7767890,
        good_title: '对子哈特',
        good_desc: '多重呵护二弟',
        good_price: 69.00,
        list: [
        "https://yanxuan-item.nosdn.127.net/b697f27edef08eb9f1b143f76dcd0551.png",
        "https://yanxuan-item.nosdn.127.net/c3fc9e438924d410eedb336a49b339a2.jpg",
        "https://yanxuan-item.nosdn.127.net/5ab4ea72dd04a401a743b90119bf3782.jpg",
        "https://yanxuan-item.nosdn.127.net/39f15462740c80ee7a6edf1b7435c493.png",
        "https://yanxuan-item.nosdn.127.net/a8669df048c4de899f432c69502121ed.png",
        ],
        commentList: {
        purchasePeopleNum: 1306,
        zanPerscent: 94.56,
        userList: [
          {
            userName: "小兔用户001",
            userPicUrl: "",
            userJudLevel: 3,
            userJudText:
              "锅好看，很重，拿锅的时候手最好不要有水，会滑。做菜时锅很烫要小心。锅边有一点瑕疵，锅内底部有一点凸起。锅内水不能超过2/3，否则即使小火也会溢水。总体还可以。",
            userJueTime: "2021-04-03 13:20:32",
          },
        ],
       },
        goodDetailList: {
        attrs: [
          {
            title: "功能",
            content: "其他",
          },
          {
            title: "适用季节",
            content: "四季",
          },
          {
            title: "温馨提示",
            content:
              "1.由于水中含有钙、镁等矿物质，毛巾水洗之后会稍微变硬。定期在含碱/盐/醋的水中蒸煮、浸泡，可使毛巾再次柔软。2.因为毛巾毛圈的丰富性，所以偶尔出现挂线用剪刀剪掉即可，不影响使用，不属于产品质量问题3.为了追求柔软的质感和高吸水性，采用弱捻工艺，可能会有浮毛和少许掉毛，属正常现象。4.该产品为面巾的尺寸，建议面部使用，如需更大尺寸，可选购浴巾。",
          },
          {
            title: "风格",
            content: "北欧",
          },
        ],
        imgList: [
          "https://yanxuan-item.nosdn.127.net/04f65e7660f7da1b13b7d03f6c7de54e.jpg",
          "https://yanxuan-item.nosdn.127.net/1dfaa80155e637dcd40606e66687fc99.jpg",
          "https://yanxuan-item.nosdn.127.net/2c825bafe1c2ff43efed4a91b1964396.jpg",
          "https://yanxuan-item.nosdn.127.net/f394e2e85a1cb463ebda080a55ccf9e2.jpg",
          "https://yanxuan-item.nosdn.127.net/307cceaaee2f842edf1f32fd128dc9be.jpg",
          "https://yanxuan-item.nosdn.127.net/8590cae12256b1a2f98c3ef45647ab66.jpg",
        ],
       }
      },
      good_num: 1,
      selectedImageNum: 0,
      isDisplay: false,
      isTabClick: true,
      comName: "GoodDetail",
      layerX: 0,
      layerY: 0,
      recList: [
        [
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
        ],
        [
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
        ],
      ]
    };
  },
  methods: {
    checkPic(event) {
      if (event.target.tagName === "IMG") {
        this.selectedImageNum =
          event.target.parentNode.parentNode.getAttribute("data-index");
      }
    },
    calPos(event) {
      const middlePos = event.target.parentNode.getBoundingClientRect();
      let x = event.pageX - middlePos.left;
      let y = event.pageY - middlePos.top - document.documentElement.scrollTop;
      if (x >= 0 && x <= 400 && y >= 0 && y <= 400) {
        let mx = 0,
          my = 0;
        if (x < 100) mx = 0;
        if (x >= 100 && x <= 300) mx = x - 100;
        if (x > 300) mx = 200;
        if (y < 100) my = 0;
        if (y >= 100 && y <= 300) my = y - 100;
        if (y > 300) my = 200;
        this.layerX = mx;
        this.layerY = my;
      }
    },
    addCart(id,num){
      service({
        
      })
    }  
  },
  components: {
    Recommend,
    GoodDetail,
    GoodComment,
  },
};
</script>
<style lang="less" scoped>
.good_show {
  margin-bottom: 20px;
  min-height: 600px;
  background-color: #fff;
  display: flex;
  .good_media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
    .good_images {
      width: 480px;
      height: 480px;
      position: relative;
      display: flex;
      z-index: 500;
      .large_image {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
        z-index: 3000;
      }
      .middle_image {
        width: 400px;
        height: 400px;
        background-color: #f5f5f5;
        position: relative;
        cursor: move;
        .image_layer {
          position: absolute;
          width: 200px;
          height: 200px;
          background-color: rgba(0, 0, 0, 0.2);
          left: 0;
          top: 0;
        }
      }
      .small_image {
        width: 80px;
        li {
          width: 68px;
          height: 68px;
          margin-left: 12px;
          margin-bottom: 15px;
          cursor: pointer;
        }
        .active_image {
          border: 2px solid #27ba9b;
        }
      }
    }
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
    .good_title {
      font-size: 22px;
    }
    .good_desc {
      color: #999;
      margin-top: 10px;
    }
    .good_price {
      margin-top: 10px;
      span {
        color: #cf4444;
        margin-right: 10px;
        font-size: 22px;
      }
    }
    .goods_sku {
      padding-left: 10px;
      padding-top: 20px;
      dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;
        dt {
          width: 50px;
          color: #999;
        }
        dd {
          flex: 1;
          color: #666;
          img {
            width: 50px;
            height: 50px;
            border: 1px solid #e4e4e4;
            margin-right: 10px;
            cursor: pointer;
          }
          span {
            display: inline-block;
            height: 30px;
            line-height: 28px;
            padding: 0 20px;
            border: 1px solid #e4e4e4;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .elInput {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }
}
.good_tabs {
  width: 100%;
  min-height: 600px;
  background-color: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      > span {
        color: #cf4444;
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .active_tab::before {
      content: "";
      position: absolute;
      left: 40px;
      bottom: -1px;
      width: 72px;
      height: 2px;
      background: #27ba9b;
    }
  }
}
.good_warn {
  min-height: 300px;
  background: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 40px;
  h3 {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
    padding-left: 50px;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  p {
    line-height: 40px;
    padding: 0 25px;
    color: #666;
  }
  .tit {
    color: #333;
  }
}
</style>