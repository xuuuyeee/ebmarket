<template>
  <div class="shortcuts">
    <div class="wrapper" v-if="isLogin">
        <router-link to="/user">{{username}}</router-link>|
        <router-link to="#" @click.native="exitAccount()">退出登录</router-link>|
        <router-link to="/user/order">我的订单</router-link>|
        <router-link to="#">关于我们</router-link>
    </div> 
    <div class="wrapper" v-else>
      <router-link to="/login">请先登录</router-link>|
      <router-link to="/home/register">免费注册</router-link>|
      <router-link to="/login">我的订单</router-link>|
      <router-link to="#">关于我们</router-link>     
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonShortcuts',
  data(){
    return{
      isLogin: false,
      username: ''
    }
  },
  created(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))   
    if(userInfo!= null){
       this.isLogin = true
       this.username = userInfo.username
    }
  },
  methods:{
    exitAccount(){
      localStorage.clear();
      this.isLogin = false
      this.$router.replace('/login');
    }
  }
}
</script>

<style lang="less" scoped>
  .shortcuts {
    height: 52px;
    background-color: #333;
    line-height: 52px;
    color: #666;
    .wrapper {
      display: flex;
      justify-content: flex-end;
      a {
        padding: 0 16px;
        font-size: 14px;
        color: #dcdcdc;
        &:hover {
          color: #27ba9b;
        }
        span {
          display: inline-block;
          margin-right: 8px;
          width: 11px;
          height: 16px;
          background: url('@/assets/images/sprites.png') -160px -70px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
