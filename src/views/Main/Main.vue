<template>
  <div class="main-container">
    <!-- 轮播图 -->
    <Banner></Banner>

    <div
      class="newGoods wrapper"
      v-for="(topic, index) in topicList"
      :key="index"
    >
      <main-title :href="topic.id">
        <template #h2>{{ topic.topicName }}</template>
        <template #span>{{ topic.description }}</template>
      </main-title>
      <fresh-popular :goodsData="topicGoodList[index]">
        <template #price="{ data }"><small>￥</small>{{ data }}</template>
      </fresh-popular>
    </div>

<!--    <topic-div-->
<!--      v-for="(topic,index) in topicList.slice(2,6)"-->
<!--      :key="topic.id"-->
<!--      :topic="topic"-->
<!--      :coverPic="coverPic[index].imgSrc"-->
<!--      :goodsData="topicGoodList[2+index]"-->
<!--    ></topic-div>-->
  </div>
</template>

<script>
import Banner from '@/views/Main/Components/Banner'
import MainTitle from '@/views/Main/Components/MainTitle'
import FreshPopular from '@/views/Main/Components/FreshPopular'
// import MainFloor from '@/views/Main/Components/MainFloor'
// import TopicDiv from '@/views/Main/Components/TopicDiv'
import service from '@/api/index'

export default {
  name: 'MyMain',
  created() {
    service({
      url: '/topic/getAll',
      method: 'GET'
    }).then((res) => {
      this.topicList = res.data.filter(item => item.topicName.trim() !== '轮播图')
      const topicIds = this.topicList.map(item => item.id)
      service({
        url: '/product/getByTopicList',
        method: 'POST',
        data: JSON.stringify(topicIds)
      }).then((res) => {
        // console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          this.topicGoodList.push(res.data[i].productVoList)
        }
        // console.log(this.topicGoodList)
      })
    })
  },
  components: {
    Banner,
    MainTitle,
    FreshPopular
    // MainFloor,
    // TopicDiv
  },
  data() {
    return {
      coverPic: [
        { imgSrc: require('@/assets/uploads/clothes_goods_cover.jpg') },
        { imgSrc: require('@/assets/uploads/kitchen_goods_cover.jpg') },
        { imgSrc: require('@/assets/uploads/home_goods_cover.jpg') }
      ],
      topicList: [],
      topicGoodList: []
    }
  }
}
</script>

<style lang="less" scoped>
.popular {
  padding-bottom: 42px;
}

.brand {
  padding-bottom: 32px;
}

.discuss {
  margin-bottom: 80px;
}
</style>
