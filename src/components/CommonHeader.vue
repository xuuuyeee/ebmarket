<template>
  <div style="width: 100%; background: #fff">
    <div class="header-container wrapper">
      <router-link to="/"><h1>企业云业务超市</h1></router-link>
      <div class="nav">
        <router-link to="/" @mouseover.native="commonHeaderListNum = 0"
          >首页</router-link
        >
        <router-link
          to="/category/4"
          @mouseover.native="commonHeaderListNum = 1"
          @click.native="fn(1)"
          >美食</router-link
        >
        <router-link
          to="/category/5"
          @mouseover.native="commonHeaderListNum = 2"
          @click.native="fn(2)"
          >餐厨</router-link
        >
        <router-link
          to="/category/6"
          @mouseover.native="commonHeaderListNum = 3"
          @click.native="fn(3)"
          >电器</router-link
        >
        <router-link
          to="/category/7"
          @mouseover.native="commonHeaderListNum = 4"
          @click.native="fn(4)"
          >居家</router-link
        >
        <router-link
          to="/category/8"
          @mouseover.native="commonHeaderListNum = 5"
          @click.native="fn(5)"
          >洗护</router-link
        >
        <router-link
          to="/category/9"
          @mouseover.native="commonHeaderListNum = 6"
          @click.native="fn(6)"
          >孕婴</router-link
        >
        <router-link
          to="/category/10"
          @mouseover.native="commonHeaderListNum = 7"
          @click.native="fn(7)"
          >服装</router-link
        >
        <router-link
          to="/category/11"
          @mouseover.native="commonHeaderListNum = 8"
          @click.native="fn(8)"
          >杂货</router-link
        >
      </div>
      <div
        :class="[isActive ? 'show_Hidden_nav' : 'hidden_nav']"
        class="second_nav"
        @mouseleave="commonHeaderListNum = 0"
      >
        <ul style="display: flex">
          <li
            v-for="(obj, index) in commonHeaderList[commonHeaderListNum]"
            :key="index"
            style="margin: 25px 40px"
          >
            <router-link
              :to="{ name: 'sup', params: { way: 'cat', sort: obj.id } }"
            >
              <el-image
                :src="obj.imgSrc"
                style="width: 60px; height: 60px"
              ></el-image>
              <p>{{ obj.title }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="search-car">
        <div class="search">
          <span></span>
          <input
            type="text"
            placeholder="搜一搜"
            v-model="searchText"
            @keydown.enter="searchGoods()"
          />
        </div>
        <router-link
          :to="canGoCart() ? { name: 'cart' } : { name: 'login' }"
          @click.prevent="canGoCart()"
        >
          <div class="car">
            <span>0</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/EventBus/index";
export default {
  name: "CommonHeader",
  data() {
    return {
      searchText: "",
      isActive: false,
      commonHeaderListNum: 0,
      commonHeaderList: [
        [],
        [
          {
            imgSrc: "",
            title: "冷冻冷藏",
            id: 12,
            description: "品质优选，值得拥有",
          },
        ],
        [
          {
            imgSrc: "",
            title: "茶咖酒具",
            id: 2,
            description: "品质优选，值得拥有",
          },
        ],
        [
          {
            imgSrc: "",
            title: "家用电器",
            id: 14,
            description: "品质优选，值得拥有",
          },
        ],
        [
          {
            imgSrc: "",
            title: "宠物食品",
            id: 7,
            description: "品质优选，值得拥有",
          },
        ],
        [
          {
            imgSrc: "",
            title: "清洁用品",
            id: 15,
            description: "品质优选，值得拥有",
          },
        ],
        [
          {
            imgSrc: "",
            title: "母婴用品",
            id: 13,
            description: "品质优选，值得拥有",
          },
        ],
        [
          {
            imgSrc: "",
            title: "女士穿搭",
            id: 3,
            description: "品质优选，值得拥有",
          },
        ],
        [
          {
            imgSrc: "",
            title: "古物文玩",
            id: 16,
            description: "品质优选，值得拥有",
          },
        ],
      ],
    };
  },
  watch: {
    commonHeaderListNum(newVal, oldVal) {
      if (newVal === 0) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
  methods: {
    searchGoods() {},
    fn(num) {
      eventBus.$emit("send", this.commonHeaderList[num]);
    },
    canGoCart() {
      if (localStorage.getItem("userInfo") == '') { 
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  h1 {
    width: 220px;
    line-height: 130px;
    height: 130px;
    font-size: 30px;
    background-size: contain;
    color: #27ba9b;
  }
  .nav {
    a {
      margin: 0 20px;
      padding-bottom: 7px;
      &:hover {
        color: #27ba9b;
        border-bottom: 2px solid #27ba9b;
      }
    }
  }
  .second_nav {
    width: 1240px;
    background-color: #fff;
    position: absolute;
    top: 170px;
    overflow: hidden;
    opacity: 1;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;
    z-index: 5000;
  }
  .show_Hidden_nav {
    height: 120px;
  }
  .hidden_nav {
    height: 0;
  }
  .search-car {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search {
      position: relative;
      width: 172px;
      height: 30px;
      border-bottom: 2px solid #e7e7e7;
      input {
        width: 172px;
        height: 28px;
        padding-left: 30px;
        outline: none;
      }
      span {
        position: absolute;
        left: 2px;
        top: 0;
        width: 18px;
        height: 18px;
        background: url("../assets/images/sprites.png") -79px -69px;
      }
    }
    .car {
      position: relative;
      width: 23px;
      height: 23px;
      margin: 0 15px;
      background: url("@/assets/images/sprites.png") -119px -69px;
      span {
        position: absolute;
        top: -7px;
        right: -12px;
        width: 20px;
        height: 15px;
        border-radius: 8px;
        background-color: #e26237;
        color: #fff;
        font-size: 13px;
        text-align: center;
        line-height: 15px;
      }
    }
  }
}
</style>
