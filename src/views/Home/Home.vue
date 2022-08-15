<template>
  <div class="home-container" style="background-color:#f5f5f5">
    <!-- 快捷导航 -->
    <common-shortcuts></common-shortcuts>
    <!-- header -->
    <common-header></common-header>
    <!-- main -->
    <router-view></router-view>
    <!-- footer -->
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonShortcuts from '@/components/CommonShortcuts.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonFooter from '@/components/CommonFooter.vue'
export default {
  name: 'MyHome',
  components: {
    CommonShortcuts,
    CommonHeader,
    CommonFooter
  },
  data(){
    return{
    }
  }
}
</script>

<style lang="less" scoped>
</style>
