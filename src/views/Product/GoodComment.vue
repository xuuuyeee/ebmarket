<template>
  <div class="good_comment">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ countPeople }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ countGood }}%</span>
          <span>好评率</span>
        </p>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" @click.prevent="sortByCreateTime()" :style="{color:(isActive == 1 ? '#27ba9b': '#666')}">最新</a>
      <a href="javascript:;"  @click.prevent="sortBylevelGood()" :style="{color:(isActive == 2 ? '#27ba9b': '#666')}">好评</a>
      <a href="javascript:;"  @click.prevent="sortBylevelBad()"  :style="{color:(isActive == 3 ? '#27ba9b': '#666')}">差评</a>
    </div>
    <div class="list">
      <div class="item" v-for="(obj,index) in commentList" :key="index">
        <div class="user">
          <!-- userPic -->
          <el-avatar>{{cutString(obj.username)}}</el-avatar>
          <span class="username">{{ obj.username }}</span>
        </div>
        <div class="body">
          <div class="score">
            <!-- starLevel -->
            <svg class="icon-small" v-for="index in obj.level" :key="index" >
              <use xlink:href="#icon-shoucanghou"></use>
            </svg>
            <svg class="icon-small" v-for="index in (5-obj.level)" :key="index">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            <span class="attr">{{obj.attributeName}}</span>
          </div>
          <div class="text">{{obj.description}}</div>
          <div class="time">
            <span>{{cutTime(obj.createTime)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        commentList: Array
    },
    methods:{
      cutString(str){
        return  str.slice(0,2)
      },
      cutTime(str){
        return str.replace('T',' ');
      },
      sortByCreateTime(){
        this.isActive = 1;
        this.commentList.sort((a,b) => Date.parse(a.createTime) - Date.parse(b.createTime))
      },
      sortBylevelGood(){
        this.isActive = 2;
        this.commentList.sort((a,b) => b.level - a.level);
      },
      sortBylevelBad(){
        this.isActive = 3;
        this.commentList.sort((a,b) => a.level - b.level);
      }
    },
    computed:{
       countPeople(){
          return this.commentList.length
       },
       countGood(){
         return  (this.commentList.filter( item => item.level >= 4).length / this.commentList.length * 100).toFixed(2)
       }
    },
    data(){
      return{
        isActive: 0
      }
    }
};
</script>
<style lang="less" scoped>
.good_comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: #cf4444;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      .sort_choice {
        color: #27ba9b;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        position: relative;
        width: 160px;
        .username {
          padding-left: 20px;
          color: #666;
          position:absolute;
          top: 3px;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .attr {
            line-height: 40px;
            padding-left: 10px;
            color: #666;
          }
        }
        .text {
          color: #666;
          line-height: 24px;
        }
        .time {
          color: #999;
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>