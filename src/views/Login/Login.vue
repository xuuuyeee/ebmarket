<template>
  <div class="login-container">
    <login-header></login-header>
    <login-main></login-main>
    <login-footer></login-footer>
  </div>
</template>

<script>
import LoginHeader from '@/views/Login/Components/LoginHeader.vue'
import LoginMain from '@/views/Login/Components/LoginMain.vue'
import LoginFooter from '@/views/Login/Components/LoginFooter.vue'
export default {
  name: 'MyLogin',
  components: {
    LoginHeader,
    LoginMain,
    LoginFooter
  }
}
</script>

<style lang="less" scoped>

</style>
