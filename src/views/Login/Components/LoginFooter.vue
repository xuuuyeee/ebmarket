<template>
  <div class="login-footer">
    <p>CopyRight © 企业云业务超市</p>
  </div>
</template>

<script>
export default {
  name: 'LoginFooter'
}
</script>

<style lang="less" scoped>
  .login-footer {
    height: 115px;
    padding-top: 40px;
    font-size: 15px;
    color: #999;
    text-align: center;
    p {
      margin-bottom: 20px;
      a {
        padding: 0 10px;
        line-height: 1;
        color: #999;
        &:hover {
          color: #27ba9b;
        }
      }
    }
  }
</style>
