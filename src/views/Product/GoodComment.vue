<template>
  <div class="good_comment">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentList.purchasePeopleNum }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentList.zanPerscent }}%</span>
          <span>好评率</span>
        </p>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">好评</a>
      <a href="javascript:;">差评</a>
    </div>
    <div class="list">
      <div class="item" v-for="(obj,index) in commentList.userList" :key="index">
        <div class="user">
          <!-- userPic -->
          <el-image
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
            "
            :src="obj.userPicUrl"
          ></el-image>
          <span>{{ obj.userName }}</span>
        </div>
        <div class="body">
          <div class="score">
            <!-- starLevel -->
            <svg class="icon-small" v-for="index in obj.userJudLevel" :key="index">
              <use xlink:href="#icon-shoucanghou"></use>
            </svg>
            <svg class="icon-small" v-for="index in (5-obj.userJudLevel)" :key="index">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            <span class="attr"></span>
          </div>
          <div class="text">{{obj.userJudText}}</div>
          <div class="time">
            <span>{{obj.userJueTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        commentList: Object
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
        width: 160px;
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .attr {
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