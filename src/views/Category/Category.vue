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
      class="wrapper category_second_classfic good_list"
      v-for="(item, index) in category_second"
      :key="index"
    >
      <router-link
        :to="{ name: 'sup', params: { way: 'category', sort: item.id } }"
        style="position: absolute; top: 20px; right: 20px"
        >查看全部 ></router-link
      >
      <h3 class="category_title">-{{ item.title }}-</h3>
      <p class="tag">
        {{ item.description }}
      </p>
      <div class="body">
        <router-link
          :to="`/product/${obj.good_id}`"
          v-for="obj in category_second_content[index]"
          :key="obj.good_id"
          class="good_item"
        >
          <el-image
            :src="BaseUrl + obj.good_img"
            style="width: 160px; height: 160px"
          ></el-image>
          <p class="name ellipsis">{{ obj.good_prodName }}</p>
          <p class="desc ellipsis">{{ obj.good_description }}</p>
          <p class="price">￥{{ obj.good_price }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import eventBus from '@/EventBus/index'
import service from "@/api";
import { BaseUrl } from "@/api/util";
export default {
  created() {
    this.sort = this.$route.params['sort'];
    eventBus.$on("send",(arr) => {
        this.category_second = arr
        this.getData(this.sort);
    })
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
      BaseUrl,
      sort: 0
    };
  },
  watch: {
    $route(to, from) {
      this.sort = this.$route.params['sort']
      this.getData(this.sort);
    },
  },
  methods: {
    getData(sort) {
      service({
        url: "/product/getByCategoryClassify",
        method: "GET",
        params: {
          id: sort
        },
      }).then((res) => {
        this.category_second_content = [];
        for (let i = 0; i < res.data.length; i++) {
          this.category_second_content.push([]);
          for (let j = 0; j < res.data[i].productVoList.length; j++) {
            this.category_second_content[i].push({
              good_id: res.data[i].productVoList[j].id,
              good_prodName: res.data[i].productVoList[j].prodName,
              good_description:
                res.data[i].productVoList[j].description.split(";")[0],
              good_img: res.data[i].productVoList[j].mainImagePosition[0],
              good_price: res.data[i].productVoList[j].price,
            });
          }
        }  
      }); 
     
    },
  },
  mounted(){
    this.getData(this.sort);
  }
};
</script>
<style lang="less" scoped>
.category_title {
  font-size: 28px;
  color: #666;
  font-weight: normal;
  text-align: center;
  line-height: 100px;
}
.category_second_classfic {
  margin-top: 15px;
  background-color: #fff;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 25px;
}
.good_list {
  position: relative;
  .tag {
    text-align: center;
    color: #999;
    font-size: 20px;
    position: relative;
    top: -20px;
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
    .good_item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all 0.5s;
      p {
        padding-top: 10px;
      }
      .name {
        font-size: 16px;
      }
      .ellipsis {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .desc {
        color: #999;
        height: 29px;
      }
      .price {
        color: #cf4444;
        font-size: 20px;
      }
      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }
    }
  }
}
</style>