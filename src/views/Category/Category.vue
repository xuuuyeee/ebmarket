<template>
    <div class="wrapper" style="margin-top: 50px">
        <div>
            <el-carousel trigger="click" height="500px">
                <el-carousel-item v-for="(item,index) in Carousel_list" :key="index">
                    <el-image :src="item" :fit="contain"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div> 
        <div class="wrapper category_second_classfic">
             <h3 class="category_title">全部分类</h3>
             <ul style="display:flex; justify-content: left; padding-top: 35px">
                <li v-for="(item,index) in classification_list" :key="index" style="margin-left:60px">
                      <router-link to="/">
                            <el-image :src="item.imgSrc" :fit="fill" style="width: 100px; height: 100px"></el-image>
                            <p>{{item.title}}</p> 
                      </router-link>     
                </li>
             </ul>
        </div>
        <div class="wrapper category_second_classfic" v-for="(item,index) in classification_list" :key="index">
             <router-link to="/" style="float: right; margin-right: 30px; margin-top:5px">查看全部 ></router-link>
             <h3 class="category_title">-{{item.title}}-</h3>  
             <h4 style="margin-top: 10px; margin-bottom: 30px">{{item.intro}}</h4>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          Carousel_list: [
            'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg',
            'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg',
            'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg',
            'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg'
          ],
          classification_list: [
           { imgSrc:'https://yanxuan.nosdn.127.net/3102b963e7a3c74b9d2ae90e4380da65.png?quality=95&imageView', title: '茶咖酒具', intro:'温暖柔软品质之选'},
           { imgSrc:'https://yanxuan.nosdn.127.net/3102b963e7a3c74b9d2ae90e4380da65.png?quality=95&imageView', title: '水具杯壶', intro:'温暖柔软品质之选'},
           { imgSrc:'https://yanxuan.nosdn.127.net/3102b963e7a3c74b9d2ae90e4380da65.png?quality=95&imageView', title: '宠物食品', intro:'温暖柔软品质之选'},
           { imgSrc:'https://yanxuan.nosdn.127.net/3102b963e7a3c74b9d2ae90e4380da65.png?quality=95&imageView', title: '宠物用品', intro:'温暖柔软品质之选'}
          ]
        }
    }
}
</script>
<style scoped>
  .category_title{
     padding-top: 30px;
  }
  .category_second_classfic{
     margin-top:15px; 
     background-color: #fff; 
     text-align: center; 
     padding-bottom:10px;
     margin-bottom: 25px
  }
</style>