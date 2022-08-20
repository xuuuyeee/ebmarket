<template>
  <div style="background-color: #f5f5f5">
    <div class="wrapper">
      <main-title :href="topic.id">
        <template #h2>{{ topic.topicName }}</template>
        <template #span>{{ topic.description }}</template>
      </main-title>
      <main-floor :LeftImg="coverPic" :goodsData="goodsData"></main-floor>
    </div>
  </div>
</template>
<script>
import MainTitle from '@/views/Main/Components/MainTitle.vue'
import MainFloor from '@/views/Main/Components/MainFloor.vue'

export default {
  components: {
    MainTitle,
    MainFloor
  },
  props: {
    topic: Object,
    coverPic: String,
    goodsData: Array
  }
}
</script>
<style lang="less" scoped>
</style>
