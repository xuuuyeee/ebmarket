<template>
  <div style="width: 100%; background: #fff">
    <div class="header-container wrapper">
      <router-link to="/"><h1>企业云业务超市</h1></router-link>
      <div class="nav">
        <router-link to="/">首页</router-link>
        <router-link
          v-for="(item,index) in categoryList"
          :key="index"
          to="/"
          @mouseover.native="currentIdx = index; isActive = true"
        >{{ item.catName }}</router-link>
      </div>
      <div
        :class="isActive  ? 'show_Hidden_nav' : 'hidden_nav'"
        class="second_nav"
        @mouseleave="isActive = false"
      >
        <ul style="display: flex; justify-content: center" v-if="currentIdx !== -1">
          <li
            v-for="(item, index) in categoryList[currentIdx].children"
            :key="index"
            style="margin: 25px 40px"
          >
            <router-link :to="{ name: 'sup', params: { way: 'cat', sort: item.id } }">
              <p>{{ item.catName }}</p>
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
<!--            <span>0</span>-->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/EventBus/index'
import categoryApi from '@/api/CategoryApi'
export default {
  name: 'CommonHeader',
  mounted() {
    const categoryList = this.categoryList
    categoryApi.getList().then(res => {
      res.data.forEach(item => { if (item.parentId === -1) categoryList.push({ ...item, children: [] }) })
      res.data.forEach(item => {
        if (item.parentId !== -1) {
          const parent = categoryList.find(e => e.id === item.parentId)
          if (parent !== undefined) { parent.children.push(item) }
        }
      })
      console.log(this.categoryList)
    })
  },
  data() {
    return {
      searchText: '',
      isActive: false,
      categoryList: [],
      currentIdx: -1
    }
  },
  watch: {
    // currentIdx(newVal, oldVal) {
    //   console.log(newVal)
    //   this.isActive = newVal !== 0
    // }
  },
  methods: {
    searchGoods() {
      if (this.searchText.trim() !== '') {
        this.$router.push({
          name: 'sup',
          params: { way: 'search', sort: '0' },
          query: { searchText: this.searchText.trim() }
        })
        this.searchText = ''
      }
    },
    fn(num) {
      eventBus.$emit('send', this.categoryList[num])
    },
    canGoCart() {
      return localStorage.getItem('userInfo') !== ''
    }
  }
}
</script>

<style lang="less" scoped>
.show_Hidden_nav p{
  font-size: 20px;
  color: #27ba9b;
}
.hidden_nav p{
  font-size: 20px;
  color: #27ba9b;
}
.nav a {
  font-size: 20px;
}
.header-container {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin-bottom: 15px;
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
    top: 120px;
    overflow: hidden;
    opacity: 1;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;
    z-index: 5000;
  }
  .show_Hidden_nav {
    height: 70px;
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
      background: url("~@/assets/images/sprites.png") -119px -69px;
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
