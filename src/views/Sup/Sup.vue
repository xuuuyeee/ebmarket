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
        v-model="searchText"
        placeholder=" 你想要什么？这里都有哦！"
        @keydown.enter="searchGoods()"
      />
      <button type="submit" class="searchButton" @click="searchGoods">
        <svg class="icon"><use xlink:href="#icon-sousuo"></use></svg>
      </button>
    </div>
    <div style="margin-top: 25px" class="filter_button_group">
      <ul style="display: flex; margin: 0 40px">
        <li>
          <button @click="sortByid()"  :style="{border: (isActive !== 1  ? '1px solid #e4e4e4' : '1px solid #5eb69c')}">默认排序</button>
        </li>
        <li>
          <button @click="sortByCreateTime()" :style="{border: (isActive !== 2 ? '1px solid #e4e4e4' : '1px solid #5eb69c')}">最新商品</button>
        </li>
        <li>
          <button @click="sortByPrice()" :style="{border: (isActive !== 3  ? '1px solid #e4e4e4' : '1px solid #5eb69c')}">价格排序</button>
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
import service from '@/api'
import Good from './Component/Good.vue'
import searchApi from '@/api/SearchApi'
export default {
  components: {
    Good
  },
  data() {
    return {
      list: [],
      way: '',
      sort: -1,
      isActive: 0,
      searchText: ''
    }
  },
  watch: {
    $route(to, from) {
      this.sort = this.$route.params.sort
      this.way = this.$route.params.way
      this.list = []
      this.getData(this.way, this.sort)
    }
  },
  mounted() {
    this.sort = this.$route.params.sort
    this.way = this.$route.params.way
    this.list = []
    this.getData(this.way, this.sort)
  },
  methods: {
    getData(way, sort) {
      if (way === 'cat') {
        service({
          url: '/product/getByCategory',
          method: 'GET',
          params: { id: sort }
        }).then((res) => {
          this.list = []
          console.log(res.data)
          for (let i = 0; i < res.data.length; i++) {
            this.list.push({
              id: res.data[i].id,
              prodName: res.data[i].prodName,
              price: res.data[i].price,
              desc: res.data[i].description.split(';')[0],
              imgSrc: res.data[i].mainImagePosition[0],
              createTime: res.data[i].createTime
            })
          }
        })
      } else if (way === 'top') {
        console.log('hello')
        service({
          url: 'product/getByTopic',
          method: 'GET',
          params: {
            id: sort
          }
        }).then((res) => {
          this.list = []
          for (let i = 0; i < res.data.length; i++) {
            this.list.push({
              id: res.data[i].id,
              prodName: res.data[i].prodName,
              price: res.data[i].price,
              desc: res.data[i].description.split(';')[0],
              imgSrc: res.data[i].mainImagePosition[0],
              createTime: res.data[i].createTime
            })
          }
        })
      } else if (way === 'search') {
        this.searchText = this.$route.query.searchText
        searchApi.searchProduct(this.searchText).then(res => {
          this.list = []
          for (let i = 0; i < res.data.length; i++) {
            this.list.push({
              id: res.data[i].id,
              prodName: res.data[i].prodName,
              price: res.data[i].price,
              desc: res.data[i].description.split(';')[0],
              imgSrc: res.data[i].mainImagePosition[0],
              createTime: res.data[i].createTime
            })
          }
        })
      }
    },
    searchGoods() {
      searchApi.searchProduct(this.searchText).then(res => {
        this.list = []
        for (let i = 0; i < res.data.length; i++) {
          this.list.push({
            id: res.data[i].id,
            prodName: res.data[i].prodName,
            price: res.data[i].price,
            desc: res.data[i].description.split(';')[0],
            imgSrc: res.data[i].mainImagePosition[0],
            createTime: res.data[i].createTime
          })
        }
      })
    },
    sortByid() {
      this.isActive = 1
      this.list.sort((a, b) => a.id - b.id)
    },
    sortByCreateTime() {
      this.isActive = 2
      this.list.sort((a, b) => Date.parse(a.createTime) - Date.parse(b.createTime))
    },
    sortByPrice() {
      this.isActive = 3
      this.list.sort((a, b) => b.price - a.price)
    }
  }
}
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
    font-size: 20px;
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
