<template>
  <div class="main-container">
    <!-- 轮播图 -->
    <Banner></Banner>
    <!-- 新鲜好物 -->
    <div
      class="newGoods wrapper"
      v-for="(topic, index) in topicList.slice(0, 2)"
      :key="index"
    >
      <main-title>
        <template #h2>{{ topic.topicName }}</template>
        <template #span>{{ topic.description }}</template>
      </main-title>
      <fresh-popular :goodsData="topicGoodList[index]">
        <template #price="{ data }"> <small>￥</small>{{ data }} </template>
      </fresh-popular>
    </div>
    <!-- 生鲜 -->

    <topic-div
      v-for="(topic, index) in topicList.slice(2)"
      :key="index"
      :topic="topic"
      :coverPic="coverPic[index].imgSrc"
      :goodsData="topicGoodList[2+index]"
    ></topic-div>
  </div>
</template>

<script>
import Banner from "@/views/Main/Components/Banner";
import MainTitle from "@/views/Main/Components/MainTitle";
import FreshPopular from "@/views/Main/Components/FreshPopular";
import MainFloor from "@/views/Main/Components/MainFloor";
import TopicDiv from "@/views/Main/Components/TopicDiv";
import service from "@/api/index";
export default {
  name: "MyMain",
  created() {
    service({
      url: "/topic/getAll",
      method: "GET",
    }).then((res) => {
      this.topicList = Array.from(res.data);
      // let idfilter = this.topicList.map( item => item.id);
      const data = [1, 2, 3];
      service({
        url: "/product/getByTopicList",
        method: "POST",
        data: JSON.stringify(data),
      }).then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.topicGoodList.push(res.data[i].productVoList);
        }
        console.log(this.topicGoodList);
      });
    });
  },
  components: {
    Banner,
    MainTitle,
    FreshPopular,
    MainFloor,
    TopicDiv,
  },
  data() {
    return {
      coverPic: [
        { imgSrc: require("@/assets/uploads/clothes_goods_cover.jpg") },
        { imgSrc: require("@/assets/uploads/kitchen_goods_cover.jpg") },
        { imgSrc: require("@/assets/uploads/home_goods_cover.jpg") },
      ],
      topicList: [],
      topicGoodList: [],
      freshData: [
        {
          imgSrc: require("@/assets/uploads/fresh_goods_1.jpg"),
          name: "美威 智利原味三文鱼排 240g/袋 4片装",
          class: "海鲜年货",
          price: 59,
        },
        {
          imgSrc: require("@/assets/uploads/fresh_goods_2.jpg"),
          name: "红功夫 麻辣小龙虾1.5kg 4-6钱/25-32只",
          class: "火锅食材",
          price: 71.9,
        },
        {
          imgSrc: require("@/assets/uploads/fresh_goods_3.jpg"),
          name: "三都港 冷冻无公害黄花鱼 700g 2条 袋装",
          class: "海鲜水产",
          price: 49.9,
        },
        {
          imgSrc: require("@/assets/uploads/fresh_goods_4.jpg"),
          name: "渔公码头 大连鲜食入味 即食海参 辽参刺...",
          class: "海鲜年货",
          price: 899,
        },
        {
          imgSrc: require("@/assets/uploads/fresh_goods_5.jpg"),
          name: "越南进口白心火龙果4个装 标准果 单果40...",
          class: "新鲜水果",
          price: 29,
        },
        {
          imgSrc: require("@/assets/uploads/fresh_goods_6.jpg"),
          name: "广西 沃柑 柑橘1.5kg",
          class: "新鲜水果",
          price: 59,
        },
        {
          imgSrc: require("@/assets/uploads/fresh_goods_7.jpg"),
          name: "进口 牛油果 6个装 单果重约130-180g",
          class: "新鲜水果",
          price: 39.9,
        },
        {
          imgSrc: require("@/assets/uploads/fresh_goods_8.jpg"),
          name: "泰国进口山竹 5A级 500g",
          class: "新鲜水果",
          price: 29.9,
        },
      ],

      clothData: [
        {
          imgSrc: require("@/assets/uploads/clothes_goods_1.jpg"),
          name: "人本秋季厚底帆布鞋韩版低帮增高学生",
          price: 55,
        },
        {
          imgSrc: require("@/assets/uploads/clothes_goods_2.jpg"),
          name: "迪士尼真皮针扣表带宽度 14-16mm规格双...",
          price: 20.9,
        },
        {
          imgSrc: require("@/assets/uploads/clothes_goods_3.jpg"),
          name: "爱马仕箱包 红色真皮斜挎包",
          price: 209,
        },
        {
          imgSrc: require("@/assets/uploads/clothes_goods_4.jpg"),
          name: "ONLY夏季新款高腰宽松 七分阔腿裙裤休闲...",
          price: 274.5,
        },
        {
          imgSrc: require("@/assets/uploads/clothes_goods_5.jpg"),
          name: "拉夫劳伦T恤男正品圆领短袖",
          price: 99,
        },
        {
          imgSrc: require("@/assets/uploads/clothes_goods_6.jpg"),
          name: "李宁跑步鞋男鞋空气弧2018春季款",
          price: 79,
        },
        {
          imgSrc: require("@/assets/uploads/clothes_goods_7.jpg"),
          name: "Dickies男鞋2022春季英伦休闲工装鞋低帮",
          price: 179,
        },
        {
          imgSrc: require("@/assets/uploads/clothes_goods_8.jpg"),
          name: "北极绒春夏季纯棉背心男士修身纯色打底",
          price: 69,
        },
      ],

      kitchenData: [
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_1.jpg"),
          name: "创意可爱不锈钢便携餐具 套装筷子便携三件套",
          price: 5.9,
        },
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_2.jpg"),
          name: "三金西瓜霜竹炭牙刷软毛 成人家用家庭装",
          price: 20.9,
        },
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_3.jpg"),
          name: "朴 (TOPOTO) 大卫免手洗平板拖把拓扑",
          price: 129,
        },
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_4.jpg"),
          name: "立白洗洁精不伤手可洗蔬菜水果",
          price: 25,
        },
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_5.jpg"),
          name: "金纺不伤手柔顺剂 妈妈的选择",
          price: 29,
        },
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_6.jpg"),
          name: "洁成绵柔抹布洗碗巾超值5片装 洗锅刷碗",
          price: 10.9,
        },
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_7.jpg"),
          name: "大卫双驱动旋转拖把桶免手洗拓扑拖布地拖...",
          price: 159,
        },
        {
          imgSrc: require("@/assets/uploads/kitchen_goods_8.jpg"),
          name: "斧头牌 (AXE) 去污地板 清洁剂2L柠檬清香",
          price: 22.9,
        },
      ],
      livingData: [
        {
          imgSrc: require("@/assets/uploads/home_goods_1.jpg"),
          name: "菜鸟异常专用链接 非请 勿拍",
          price: 8999,
        },
        {
          imgSrc: require("@/assets/uploads/home_goods_2.jpg"),
          name: "【中盐软水盐】汉斯希尔家用软水机适配",
          price: 65,
        },
        {
          imgSrc: require("@/assets/uploads/home_goods_3.jpg"),
          name: "云米净水壶家用直饮台式 净水机渗透过滤...",
          price: 129,
        },
        {
          imgSrc: require("@/assets/uploads/home_goods_4.jpg"),
          name: "ztk恒温调奶器配件玻璃壶 炖盅",
          price: 159,
        },
        {
          imgSrc: require("@/assets/uploads/home_goods_5.jpg"),
          name: "荞麦枕头单人枕芯双人护颈椎枕头芯",
          price: 29,
        },
        {
          imgSrc: require("@/assets/uploads/home_goods_6.jpg"),
          name: "Bear/小熊 LLJ-B04G1家用多功能切碎机...",
          price: 10.9,
        },
        {
          imgSrc: require("@/assets/uploads/home_goods_7.jpg"),
          name: "荣事达薄饼机春饼春卷皮 家用薄饼机电饼铛",
          price: 179,
        },
        {
          imgSrc: require("@/assets/uploads/home_goods_8.jpg"),
          name: "美式双人实木床 红实木 显档次",
          price: 3399,
        },
      ],
    };
  },
};
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
