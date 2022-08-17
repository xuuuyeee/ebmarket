<template>
  <div class="wrapper" style="margin-top: 50px">
    <div>
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="(item, index) in Carousel_list" :key="index">
          <el-image :src="item"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="wrapper category_second_classfic">
      <h3 class="category_title">全部分类</h3>
      <ul style="display: flex; justify-content: left; padding-top: 35px">
        <li
          v-for="(item, index) in category_second"
          :key="index"
          style="margin-left: 60px"
        >
          <router-link to="/">
            <el-image
              :src="item.imgSrc"
              style="width: 100px; height: 100px"
            ></el-image>
            <p>{{ item.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="wrapper category_second_classfic"
      v-for="(item, index) in category_second_content"
      :key="index"
    >
      <router-link
        to="/"
        style="float: right; margin-right: 30px; margin-top: 5px"
        >查看全部 ></router-link
      >
      <h3 class="category_title">-{{ item.title }}-</h3>
      <h4 style="margin-top: 10px; margin-bottom: 30px">{{ item.intro }}</h4>
    </div>
  </div>
</template>
<script>
import eventBus from "@/EventBus/index";
import service from "@/api";
export default {
  created() {
    eventBus.$on("send", (arr) => {
      this.category_second = Array.from(arr);
    });
    console.log(this.$route.params['sort'])
    service({
      url: "/getByCategoryClassify",
      method: "GET",
      params: {
        id: this.$route.params['sort']
      },
    }).then((res) => {
      console.log(res);
    });
  },
  data() {
    return {
      Carousel_list: [
        "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg",
        "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg",
        "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg",
        "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg",
      ],
      category_second: [],
      category_second_content: [],
    };
  },
};
</script>
<style scoped>
.category_title {
  padding-top: 30px;
}
.category_second_classfic {
  margin-top: 15px;
  background-color: #fff;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 25px;
}
</style>