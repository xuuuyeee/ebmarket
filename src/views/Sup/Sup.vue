<template>
  <div
    class="wrapper"
    style="
      background-color: #fff;
      padding: 0 25px;
      margin-top: 25px;
      margin-bottom: 20px;
    "
  >
    <!-- 面包屑 -->
    <div class="search" style="padding-top: 30px">
      <input
        type="text"
        class="searchTerm"
        placeholder="     你想要什么？这里都有哦！"
      />
      <button type="submit" class="searchButton">
        <svg class="icon"><use xlink:href="#icon-sousuo"></use></svg>
      </button>
    </div>
    <div style="margin-top: 25px" class="filter_button_group">
      <ul style="display: flex; margin: 0 40px">
        <li>
          <button @click="sortByid()"  :style="{border: (isActive != 1  ? '1px solid #e4e4e4' : '1px solid #5eb69c')}">默认排序</button>
        </li>
        <li>
          <button @click="sortByCreateTime()" :style="{border: (isActive != 2 ? '1px solid #e4e4e4' : '1px solid #5eb69c')}">最新商品</button>
        </li>
        <li>
          <button @click="sortByPrice()" :style="{border: (isActive != 3  ? '1px solid #e4e4e4' : '1px solid #5eb69c')}">价格排序</button>
        </li>
      </ul>
    </div>
    <ul
      style="display: flex; flex-wrap: wrap; padding: 0 5px; padding-top: 30px"
    >
      <Good v-for="(obj, index) in list" :key="index" :obj="obj"></Good>
    </ul>
  </div>
</template>
<script>
import service from "@/api";
import Good from "./Component/Good.vue";
export default {
  components: {
    Good,
  },
  data() {
    return {
      list: [
        {
          imgSrc:
            "https://yanxuan-item.nosdn.127.net/b9d46625f648ae26aa84194e4810ab15.jpg",
          good_name: "干湿两用懒人抹布1卷50节",
          good_desc: "木浆吸水吸油，热销200万卷",
          good_price: (13.9).toFixed(2),
          good_id: "7767890",
        },
      ],
      way: "",
      sort: -1,
      isActive: 0
    };
  },
  watch: {
    $route(to, from) {
      this.sort = this.$route.params["sort"];
      this.way = this.$route.params["way"];
      this.getData(this.way, this.sort);
    },
  },
  created() {
    this.sort = this.$route.params["sort"];
    this.way = this.$route.params["way"];
    this.getData(this.way, this.sort);
  },
  methods: {
    getData(way, sort) {
      if (way == "cat") {
        service({
          url: "/product/getByCategory",
          method: "GET",
          params: { id: sort },
        }).then((res) => {
          this.list = [];
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            this.list.push({
              id: res.data[i].id,
              prodName: res.data[i].prodName,
              price: res.data[i].price,
              desc: res.data[i].description.split(";")[0],
              imgSrc: res.data[i].mainImagePosition[0],
              createTime: res.data[i].createTime
            });
          }
        });
      } else if (way == "top") {
        console.log("hello");
        service({
          url: "product/getByTopic",
          method: "GET",
          params: {
            id: sort,
          },
        }).then((res) => {
          this.list = [];
          for (let i = 0; i < res.data.length; i++) {
            this.list.push({
              id: res.data[i].id,
              prodName: res.data[i].prodName,
              price: res.data[i].price,
              desc: res.data[i].description.split(";")[0],
              imgSrc: res.data[i].mainImagePosition[0],
              createTime: res.data[i].createTime
            });
          }
        });
      }
    },
    sortByid(){
      this.isActive = 1;
      this.list.sort((a,b) => a.id - b.id);
    },
    sortByCreateTime(){
      this.isActive = 2;
      this.list.sort((a,b) => Date.parse(a.createTime) - Date.parse(b.createTime))
    },
    sortByPrice(){
      this.isActive = 3;
      this.list.sort((a,b) => a.price - b.price)
    }
  },
};
</script>
<style scoped lang="less">
.search {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  .searchTerm {
    width: 50%;
    border: 3px solid #5eb69c;
    border-right: none;
    padding: 5px;
    height: 50px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #5eb69c;
    &:focus {
      color: black;
    }
  }
  .searchButton {
    width: 50px;
    height: 50px;
    border: 1px solid #5eb69c;
    background: #5eb69c;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
  }
}
.filter_button_group {
  ul {
    li {
      button {
        height: 30px;
        line-height: 28px;
        border: 1px solid #e4e4e4;
        padding: 0 20px;
        margin-right: 20px;
        color: #999;
        border-radius: 2px;
        position: relative;
        // transition: all 0.3s;
        background: #fff;
      }
    }
  }
}
// .active{
//   border: 1px solid #5eb69c;
// }
</style>