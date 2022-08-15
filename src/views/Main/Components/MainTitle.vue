<template>
  <div class="title">
    <h2>
      <slot name="h2"></slot>
      <span>
        <slot name="span"></slot>
      </span>
    </h2>
    <span class="list">
        <a href="javascript:;" v-for="(item, key) in navList" :key="key">
          <slot name="navSpan" :nav="item"></slot>
        </a>
    </span>
    <a href="javascript:;" class="more">查看全部</a>
  </div>
</template>

<script>
export default {
  name: 'MainTitle',
  props: {
    navList: Array
  }
}
</script>

<style lang="less" scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 114px;
    h2 {
      font-size: 29px;
      font-weight: 400;
      span {
        margin-left: 34px;
        font-size: 16px;
        color: #999;
      }
    }
    .list {
      a {
        padding: 2px 8px;
        margin-left: 10px;
        border-radius: 2px;
        &:hover,
        &:first-child {
          background-color: #5eb69c;
          color: #fff;
        }
      }
    }
    .more {
      color: #999;
      &:hover {
        color: #27ba9b;
      }
      &::after {
        content: "";
        display: inline-block;
        margin-left: 13px;
        width: 7px;
        height: 13px;
        background: url('@/assets/images/sprites.png') 0 -109px;
        vertical-align: middle;
      }
    }
  }
</style>
