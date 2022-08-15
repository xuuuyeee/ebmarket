<template>
<div style="width: 100%; background: #fff">
  <div class="header-container wrapper">
    <router-link to="/"><h1></h1></router-link>
    <div class="nav">
      <router-link to="/"  @mouseover.native="commonHeaderListNum = 0" >首页</router-link>
      <router-link to="/category/10001"  @mouseover.native="commonHeaderListNum = 1" >美食</router-link>
      <router-link to="/category/10002"  @mouseover.native="commonHeaderListNum = 2">餐厨</router-link>
      <router-link to="/category/10003"  @mouseover.native="commonHeaderListNum = 3">电器</router-link>
      <router-link to="/category/10004"  @mouseover.native="commonHeaderListNum = 4">居家</router-link>
      <router-link to="/category/10005"  @mouseover.native="commonHeaderListNum = 5">洗护</router-link>
      <router-link to="/category/10006"  @mouseover.native="commonHeaderListNum = 6" >孕婴</router-link>
      <router-link to="/category/10007"  @mouseover.native="commonHeaderListNum = 7" >服装</router-link>
      <router-link to="/category/10008"  @mouseover.native="commonHeaderListNum = 8" >杂货</router-link>
    </div>
    <div :class="[ isActive ? 'show_Hidden_nav' : 'hidden_nav' ]" class="second_nav"  @mouseleave="commonHeaderListNum = 0">
          <ul style="display: flex">
            <li v-for="(obj,index) in commonHeaderList[commonHeaderListNum]" :key="index" style="margin: 25px 40px">
                <router-link :to="{name:'sup',params:{sort: obj.id}}">
                  <el-image :src="obj.imgSrc" style="width: 60px; height: 60px;"></el-image>
                  <p>{{obj.title}}</p>
                </router-link>
            </li>
          </ul>
    </div>
    <div class="search-car">
      <div class="search">
        <span></span>
        <input type="text" placeholder="搜一搜" v-model="searchText" @keydown.enter="searchGoods()">
      </div>
      <router-link to="/cart">
       <div class="car">
         <span>2</span>
       </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CommonHeader',
  data(){
    return{
      searchText: '',
      isActive: false,
      commonHeaderListNum: 0,
      commonHeaderList: [
        [],
        [{
          imgSrc:'https://yanxuan.nosdn.127.net/3102b963e7a3c74b9d2ae90e4380da65.png?quality=95&imageView',
          title: '茶咖酒具',
          id: 332626
        },{
          imgSrc:'https://yanxuan.nosdn.127.net/45b50d5f8afbd6fdef97314647dcb7db.png?quality=95&imageView',
          title: '水具杯壶',
          id: 576876
        }],[],[],[],[],[],[],[]
      ]
    }
  },
  watch:{
    commonHeaderListNum(newVal,oldVal){
       if(newVal === 0){
           this.isActive = false;
       }
       else{
           this.isActive = true;
       }
    }
  },
  methods:{
    searchGoods(){
      axios({
        url: "/searchGoods",
        method: "POST",
        data: {
          text: this.searchText
        }
      }).then((res)=>{
        // if(res.data.code == 200)
        //   this.$router.push({
        //     name: 'sup',
        //     params:{
        //       sort: res.data.num
        //     }
        //   })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .header-container {
    background-color: #fff ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 130px;
    h1 {
      width: 200px;
      height: 130px;
      background: url('@/assets/images/logo.png') no-repeat 50%;
      background-size: contain;
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
    .second_nav{
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
    .show_Hidden_nav{
       height: 120px;
    }
    .hidden_nav{
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
          background: url('../assets/images/sprites.png') -79px -69px;
        }
      }
      .car {
        position: relative;
        width: 23px;
        height: 23px;
        margin: 0 15px;
        background: url('@/assets/images/sprites.png') -119px -69px;
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
