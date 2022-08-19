<template>
  <el-container direction="vertical" class="wrapper">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-top: 30px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="#">购物车</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-main style="background: #fff" class="wrapper">
      <el-table :data="cartItemFrontVoList">
        <el-table-column label="选择" width="150">
          <template slot-scope="scope">
            <input type="checkbox" v-model="scope.row.state" />
          </template>
        </el-table-column>
        <el-table-column label="商品信息" width="400">
          <template slot-scope="scope">
            <div style="display: flex">
              <el-image
                :src="BaseUrl+scope.row.imagePosition"
                style="width: 100px; height: 100px; display: inline-block"
              ></el-image>
              <div class="goods_name">
                <span>{{ scope.row.goods_name }}</span>
                <span>{{ scope.row.attr }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.count"
              @change.native="changeNum()"
              :min="1"
              size="small"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计">
          <template slot-scope="scope">
            <span>￥{{ subTotal(scope.row.count, scope.row.price) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="delGood(scope.$index)"
              style="background-color: #27ba9b; border: #27ba9b"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-main
      style="background: #fff; margin-top: 30px; margin-bottom: 30px"
      class="wrapper"
    >
      <div class="action">
        <div class="batch">
          <el-checkbox v-model="isAll" fill="#27ba9b" text-color="#27ba9b"
            ><span>全选</span></el-checkbox
          >&nbsp;
        </div>
        <div class="settle_count">
          共<span>{{ allCount() }}</span
          >件商品，已经选择<span>{{ selectedCount() }}</span
          >件，商品合计：<span class="red">￥{{ sumTotal() }}</span>
          <button class="green_button">下单结算</button>
        </div>
      </div>
    </el-main>
    <Recommend :recList="recList"></Recommend>
  </el-container>
</template>
<script>
import service from '@/api';
import Recommend from "./Recommend/Recommend.vue";
import { BaseUrl } from '@/api/util'
export default {
  data() {
    return {
      list: [
        {
          goods_name: "24寸搜神记铝框拉杆箱",
          price: 384,
          count: 1,
          imgSrc:
            "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          state: true,
          attr: "粉色 纪念款 2019",
        },
        {
          goods_name: "24寸搜神记铝框拉杆箱",
          price: 384,
          count: 1,
          imgSrc:
            "https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png",
          state: true,
          attr: "粉色 纪念款 2019",
        },
      ],
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
      ],
      cartItemFrontVoList:[],
      BaseUrl
    };
  },
  computed: {
    isAll: {
      set(val) {
        this.list.forEach((obj) => (obj.state = val));
      },
      get() {
        return this.list.every((obj) => obj.state === true);
      },
    },
  },
  methods: {
    subTotal(price, count) {
      return Number.parseFloat(price * count).toFixed(2);
    },
    allCount() {
      return this.list.reduce((sum, obj) => sum + obj.count, 0);
    },
    selectedCount() {
      return this.list.reduce(
        (sum, obj) => (obj.state ? sum + obj.count : sum),
        0
      );
    },
    sumTotal() {
      return this.list.reduce(
        (sum, obj) => (obj.state ? sum + obj.count * obj.price : sum),
        0
      );
    },
    delGood(index) {
      this.list.splice(index, 1);
    },
    changeNum(){

    },
    updateCart(){
      service({
        url: '/cart/getAll',
        method: 'GET',
        params: { id: JSON.parse(localStorage.getItem('userInfo')).id }
      }).then( res => {
        console.log(res.data);
         for(let i=0;i<res.data.length;i++){
            this.cartItemFrontVoList.push({
              prodName: res.data[i].prodName,
              attr: res.data[i].attributeValue,
              count: res.data[i].count,
              imagePosition: res.data[i].imagePosition,
              cartItemId: res.data[i].id,
              state: true
            })
         }
      })
    }
  },
  components: {
    Recommend,
  },
  created(){
    this.updateCart()      
  }
};
</script>
<style lang="less" scoped>
.goods_name {
  margin-left: 15px;
  margin-right: 12%;
  span {
    padding-top: 10px;
    margin-bottom: 8px;
    display: block;
  }
}
/deep/ .cell {
  text-align: center;
}
.action {
  display: flex;
  background: #fff;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 10px;
  .batch{
    margin-left : 55px;
  }
  .settle_count {
    line-height: 30px;
    text-align: center;
    span {
      line-height: 30px;
    }
    button {
      margin-left: 15px;
      margin-right: 20px;
    }
    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: 700;
      color: #cf4444;
    }
  }
}
</style>
