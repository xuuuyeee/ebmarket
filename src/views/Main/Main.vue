<template>
  <div class="main-container">
    <!-- 轮播图 -->
    <Banner></Banner>
    <!-- 新鲜好物 -->
    <div class="newGoods wrapper">
      <main-title>
        <template #h2>新鲜好物</template>
        <template #span>新鲜出炉 品质靠谱</template>
      </main-title>
      <fresh-popular :goodsData="news">
        <template #price="{ data }">
          <small>￥</small>{{ data }}
        </template>
      </fresh-popular>
    </div>
    <!-- 人气推荐 -->
    <div class="popular wrapper">
      <main-title>
        <template #h2>人气推荐</template>
        <template #span>人气爆款 不容错过</template>
      </main-title>
      <fresh-popular :goodsData="popular">
        <template #info="{ data }">
          {{ data }}
        </template>
      </fresh-popular>
    </div>
    <!-- 秒杀专区 -->
    <div class="seckill">
      <div class="wrapper">
        <main-title>
          <template #h2>秒杀专区</template>
          <template #span>每日精品 限量秒杀</template>
        </main-title>
        <main-seckill :pics="seckill">
        </main-seckill>
      </div>
    </div>
    <!-- 热门品牌 -->
    <div class="brand wrapper">
      <main-title>
        <template #h2>热门品牌</template>
        <template #span>国际经典 品质保证</template>
      </main-title>
      <main-seckill :pics="brand"></main-seckill>
    </div>
    <!-- 生鲜 -->
    <div class="fresh">
      <div class="wrapper">
        <main-title :navList="fresh">
          <template #h2>生鲜</template>
          <template #navSpan="{ nav }">{{ nav }}</template>
        </main-title>
        <main-floor :LeftImg="freshPic" :goodsData="freshData"></main-floor>
      </div>
    </div>
    <!-- 服饰 -->
    <div class="cloth">
      <div class="wrapper">
        <main-title :navList="cloth">
          <template #h2>服饰</template>
          <template #navSpan="{ nav }">{{ nav }}</template>
        </main-title>
        <main-floor :LeftImg="clothPic" :goodsData="clothData"></main-floor>
      </div>
    </div>
    <!-- 厨具 -->
    <div class="kitchen">
      <div class="wrapper">
        <main-title :navList="kitchen">
          <template #h2>厨具</template>
          <template #navSpan="{ nav }">{{ nav }}</template>
        </main-title>
        <main-floor :LeftImg="kitchenPic" :goodsData="kitchenData"></main-floor>
      </div>
    </div>
    <!-- 居家 -->
    <div class="living">
      <div class="wrapper">
        <main-title :navList="living">
          <template #h2>居家</template>
          <template #navSpan="{ nav }">{{ nav }}</template>
        </main-title>
        <main-floor :LeftImg="livingPic" :goodsData="livingData"></main-floor>
      </div>
    </div>
    <!-- 最新专题 -->
    <div class="topic wrapper">
      <main-title>
        <template #h2>最新专题</template>
      </main-title>
      <topic-discuss :top_disData="topicData"></topic-discuss>
    </div>
    <!-- 大家都在说 -->
    <div class="discuss wrapper">
      <main-title>
        <template #h2>大家都在说</template>
      </main-title>
      <topic-discuss :top_disData="discussData"></topic-discuss>
    </div>
  </div>
</template>

<script>
import Banner from '@/views/Main/Components/Banner.vue'
import MainTitle from '@/views/Main/Components/MainTitle.vue'
import FreshPopular from '@/views/Main/Components/FreshPopular.vue'
import MainSeckill from '@/views/Main/Components/MainSeckill.vue'
import MainFloor from '@/views/Main/Components/MainFloor.vue'
import TopicDiscuss from '@/views/Main/Components/TopicDiscuss.vue'
export default {
  name: 'MyMain',
  components: {
    Banner,
    MainTitle,
    FreshPopular,
    MainSeckill,
    MainFloor,
    TopicDiscuss
  },
  data () {
    return {
      news: [
        { imgSrc: require('@/assets/uploads/new_goods_1.jpg'), name: '睿米无线吸尘器F8', price: 899 },
        { imgSrc: require('@/assets/uploads/new_goods_2.jpg'), name: '智能环绕3D空调', price: 1299 },
        { imgSrc: require('@/assets/uploads/new_goods_3.jpg'), name: '广东软软糯米煲仔饭', price: 129 },
        { imgSrc: require('@/assets/uploads/new_goods_4.jpg'), name: '罗西机械智能手表', price: 3399 }
      ],
      popular: [
        { imgSrc: require('@/assets/uploads/popular_1.jpg'), name: '特惠推荐', info: '我猜得到 你的需要' },
        { imgSrc: require('@/assets/uploads/popular_2.jpg'), name: '爆款推荐', info: '人气好物推荐' },
        { imgSrc: require('@/assets/uploads/popular_3.jpg'), name: '场景使用一站买全', info: '编辑精心整理推荐' },
        { imgSrc: require('@/assets/uploads/popular_4.jpg'), name: '领券中心', info: '发现更多超值优惠券' }
      ],
      seckill: [
        { imgSrc: require('@/assets/uploads/seckill_goods_1.jpg'), name: '华为 降噪 真无线耳机', price: 99, oldPrice: 199 },
        { imgSrc: require('@/assets/uploads/seckill_goods_2.jpg'), name: '双星男鞋 直筒工装裤', price: 199, oldPrice: 299 },
        { imgSrc: require('@/assets/uploads/seckill_goods_3.jpg'), name: '妮维维女士 止汗露走珠', price: 59, oldPrice: 99 },
        { imgSrc: require('@/assets/uploads/seckill_goods_4.jpg'), name: '肖勒超薄防水手表', price: 399, oldPrice: 899 }
      ],
      brand: [
        { imgSrc: require('@/assets/uploads/brand_goods_1.jpg') },
        { imgSrc: require('@/assets/uploads/brand_goods_2.jpg') },
        { imgSrc: require('@/assets/uploads/brand_goods_3.jpg') },
        { imgSrc: require('@/assets/uploads/brand_goods_4.jpg') },
        { imgSrc: require('@/assets/uploads/brand_goods_5.jpg') }
      ],
      fresh: ['水果', '蔬菜', '肉禽蛋', '海鲜水产', '冷饮冻食'],
      cloth: ['裤装', '衬衫', '内衣', '男鞋', '女鞋', '拖鞋'],
      kitchen: ['水具酒具', '烹饪锅具', '炒锅', '碗碟套装', '厨房配件'],
      living: ['咖啡具', '茶具', '家纺', '家具', '灯具'],
      freshPic: [
        { imgSrc: require('@/assets/uploads/fresh_goods_cover.png') }
      ],
      freshData: [
        { imgSrc: require('@/assets/uploads/fresh_goods_1.jpg'), name: '美威 智利原味三文鱼排 240g/袋 4片装', class: '海鲜年货', price: 59 },
        { imgSrc: require('@/assets/uploads/fresh_goods_2.jpg'), name: '红功夫 麻辣小龙虾1.5kg 4-6钱/25-32只', class: '火锅食材', price: 71.9 },
        { imgSrc: require('@/assets/uploads/fresh_goods_3.jpg'), name: '三都港 冷冻无公害黄花鱼 700g 2条 袋装', class: '海鲜水产', price: 49.9 },
        { imgSrc: require('@/assets/uploads/fresh_goods_4.jpg'), name: '渔公码头 大连鲜食入味 即食海参 辽参刺...', class: '海鲜年货', price: 899 },
        { imgSrc: require('@/assets/uploads/fresh_goods_5.jpg'), name: '越南进口白心火龙果4个装 标准果 单果40...', class: '新鲜水果', price: 29 },
        { imgSrc: require('@/assets/uploads/fresh_goods_6.jpg'), name: '广西 沃柑 柑橘1.5kg', class: '新鲜水果', price: 59 },
        { imgSrc: require('@/assets/uploads/fresh_goods_7.jpg'), name: '进口 牛油果 6个装 单果重约130-180g', class: '新鲜水果', price: 39.9 },
        { imgSrc: require('@/assets/uploads/fresh_goods_8.jpg'), name: '泰国进口山竹 5A级 500g', class: '新鲜水果', price: 29.9 }
      ],
      clothPic: [
        { imgSrc: require('@/assets/uploads/clothes_goods_cover.jpg') }
      ],
      clothData: [
        { imgSrc: require('@/assets/uploads/clothes_goods_1.jpg'), name: '人本秋季厚底帆布鞋韩版低帮增高学生', price: 55 },
        { imgSrc: require('@/assets/uploads/clothes_goods_2.jpg'), name: '迪士尼真皮针扣表带宽度 14-16mm规格双...', price: 20.9 },
        { imgSrc: require('@/assets/uploads/clothes_goods_3.jpg'), name: '爱马仕箱包 红色真皮斜挎包', price: 209 },
        { imgSrc: require('@/assets/uploads/clothes_goods_4.jpg'), name: 'ONLY夏季新款高腰宽松 七分阔腿裙裤休闲...', price: 274.5 },
        { imgSrc: require('@/assets/uploads/clothes_goods_5.jpg'), name: '拉夫劳伦T恤男正品圆领短袖', price: 99 },
        { imgSrc: require('@/assets/uploads/clothes_goods_6.jpg'), name: '李宁跑步鞋男鞋空气弧2018春季款', price: 79 },
        { imgSrc: require('@/assets/uploads/clothes_goods_7.jpg'), name: 'Dickies男鞋2022春季英伦休闲工装鞋低帮', price: 179 },
        { imgSrc: require('@/assets/uploads/clothes_goods_8.jpg'), name: '北极绒春夏季纯棉背心男士修身纯色打底', price: 69 }
      ],
      kitchenPic: [
        { imgSrc: require('@/assets/uploads/kitchen_goods_cover.jpg') }
      ],
      kitchenData: [
        { imgSrc: require('@/assets/uploads/kitchen_goods_1.jpg'), name: '创意可爱不锈钢便携餐具 套装筷子便携三件套', price: 5.9 },
        { imgSrc: require('@/assets/uploads/kitchen_goods_2.jpg'), name: '三金西瓜霜竹炭牙刷软毛 成人家用家庭装', price: 20.9 },
        { imgSrc: require('@/assets/uploads/kitchen_goods_3.jpg'), name: '朴 (TOPOTO) 大卫免手洗平板拖把拓扑', price: 129 },
        { imgSrc: require('@/assets/uploads/kitchen_goods_4.jpg'), name: '立白洗洁精不伤手可洗蔬菜水果', price: 25 },
        { imgSrc: require('@/assets/uploads/kitchen_goods_5.jpg'), name: '金纺不伤手柔顺剂 妈妈的选择', price: 29 },
        { imgSrc: require('@/assets/uploads/kitchen_goods_6.jpg'), name: '洁成绵柔抹布洗碗巾超值5片装 洗锅刷碗', price: 10.9 },
        { imgSrc: require('@/assets/uploads/kitchen_goods_7.jpg'), name: '大卫双驱动旋转拖把桶免手洗拓扑拖布地拖...', price: 159 },
        { imgSrc: require('@/assets/uploads/kitchen_goods_8.jpg'), name: '斧头牌 (AXE) 去污地板 清洁剂2L柠檬清香', price: 22.9 }
      ],
      livingPic: [
        { imgSrc: require('@/assets/uploads/home_goods_cover.jpg') }
      ],
      livingData: [
        { imgSrc: require('@/assets/uploads/home_goods_1.jpg'), name: '菜鸟异常专用链接 非请 勿拍', price: 8999 },
        { imgSrc: require('@/assets/uploads/home_goods_2.jpg'), name: '【中盐软水盐】汉斯希尔家用软水机适配', price: 65 },
        { imgSrc: require('@/assets/uploads/home_goods_3.jpg'), name: '云米净水壶家用直饮台式 净水机渗透过滤...', price: 129 },
        { imgSrc: require('@/assets/uploads/home_goods_4.jpg'), name: 'ztk恒温调奶器配件玻璃壶 炖盅', price: 159 },
        { imgSrc: require('@/assets/uploads/home_goods_5.jpg'), name: '荞麦枕头单人枕芯双人护颈椎枕头芯', price: 29 },
        { imgSrc: require('@/assets/uploads/home_goods_6.jpg'), name: 'Bear/小熊 LLJ-B04G1家用多功能切碎机...', price: 10.9 },
        { imgSrc: require('@/assets/uploads/home_goods_7.jpg'), name: '荣事达薄饼机春饼春卷皮 家用薄饼机电饼铛', price: 179 },
        { imgSrc: require('@/assets/uploads/home_goods_8.jpg'), name: '美式双人实木床 红实木 显档次', price: 3399 }
      ],
      topicData: [
        { imgSrc: require('@/assets/uploads/topic_goods_1.jpg'), title: '吃这些美食不算辜负自己', description: '餐厨起居洗护好物', price: '29.9起', like: 1220, view: 1800, replay: 1220 },
        { imgSrc: require('@/assets/uploads/topic_goods_2.jpg'), title: '吃这些美食不算辜负自己', description: '餐厨起居洗护好物', price: '29.9起', like: 1220, view: 1800, replay: 1220 },
        { imgSrc: require('@/assets/uploads/topic_goods_3.jpg'), title: '吃这些美食不算辜负自己', description: '餐厨起居洗护好物', price: '29.9起', like: 1220, view: 1800, replay: 1220 }
      ],
      discussData: [
        { imgSrc: require('@/assets/uploads/discuss_goods_1.jpg'), title: '中国制造 红木柜茶几', description: '小花 2022-05-10 14:00', price: '1199起', message: '从小我就看我奶奶把用完的超市塑料袋整整齐齐叠放好，等以后需要再拿出来用。现在奶奶已经不在了，塑料袋也要收费了。 奶奶不紧不慢，把袋子认真折好的场景，一直在脑海里挥之不去。' },
        { imgSrc: require('@/assets/uploads/discuss_goods_2.jpg'), title: '中国制造 红木柜茶几', description: '小花 2022-05-10 14:00', price: '1199起', message: '从小我就看我奶奶把用完的超市塑料袋整整齐齐叠放好，等以后需要再拿出来用。现在奶奶已经不在了，塑料袋也要收费了。 奶奶不紧不慢，把袋子认真折好的场景，一直在脑海里挥之不去。' },
        { imgSrc: require('@/assets/uploads/discuss_goods_3.jpg'), title: '中国制造 红木柜茶几', description: '小花 2022-05-10 14:00', price: '1199起', message: '从小我就看我奶奶把用完的超市塑料袋整整齐齐叠放好，等以后需要再拿出来用。现在奶奶已经不在了，塑料袋也要收费了。 奶奶不紧不慢，把袋子认真折好的场景，一直在脑海里挥之不去。' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .popular {
    padding-bottom: 42px;
  }
  .seckill {
    padding: 7px 0 55px 0;
    background-color: #f5f5f5;
  }
  .brand {
    padding-bottom: 32px;
  }
  .fresh,
  .cloth,
  .kitchen,
  .living {
    background-color: #f5f5f5;
  }
  .discuss {
    margin-bottom: 80px;
  }
</style>
