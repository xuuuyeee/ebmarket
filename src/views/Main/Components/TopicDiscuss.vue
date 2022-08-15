<template>
  <div class="pannel">
    <ul>
      <li v-for="item in top_disData" :key="item.imgSrc">
        <a href="javascript:;">
          <img :src="item.imgSrc" alt="">
          <div :class="item.like ? 'meta1' : 'meta2'">
            <p class="title">{{ item.title }}<small>{{ item.description }}</small></p>
            <span class="price"><small>￥</small>{{ item.price }}</span>
          </div>
        </a>
        <div class="social" v-if="item.like">
          <span class="like">
            <i class="sprites"></i>
            {{ item.like }}
          </span>
          <span class="view">
            <i class="sprites"></i>
            {{ item.view }}
          </span>
          <span class="replay">
            <i class="sprites"></i>
            {{ item.replay }}
          </span>
        </div>
        <p class="message" v-else>{{ item.message }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TopicDiscuss',
  props: {
    top_disData: Array
  }
}
</script>

<style lang="less" scoped>
  .pannel {
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 406px;
        transition: 0.5s;
        a {
          position: relative;
          display: block;
          height: 287px;
          img {
            max-width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
          .meta1 {
            width: 100%;
            height: 100%;
            color: #fff;
            background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 50%);
            position: absolute;
            bottom: 0;
            .title {
              position: absolute;
              bottom: 0;
              height: 70px;
              padding-left: 16px;
              font-size: 22px;
              small {
                font-size: 19px;
              }
            }
          }
          .meta2 {
            position: relative;
            height: 90px;
            padding: 20px 0 0;
            margin: 0 16px;
            font-size: 22px;
            border-bottom: 1px solid #eee;
            .title {
              small {
                font-size: 16px;
              }
            }
          }
          .title small{
            display: block;
            color: #999;
          }
          .price {
            position: absolute;
            bottom: 25px;
            right: 16px;
            display: block;
            padding: 4px 8px;
            color: #9a2e1f;
            font-size: 17px;
            line-height: 1;
            background-color: #fff;
            border-radius: 2px;
            small {
              font-size: 15px;
            }
          }
        }
        .social {
          height: 70px;
          padding: 0 20px;
          line-height: 70px;
          .like,
          .view {
            float: left;
            margin-right: 25px;
          }
          .replay {
            float: right;
            i {
              width: 17px;
              height: 16px;
              top: 4px;
              background-position: -200px -110px;
            }
          }
          i {
            display: inline-block;
            width: 15px;
            height: 14px;
            margin-right: 5px;
            position: relative;
            top: 2px;
            background-image: url('@/assets/images/sprites.png');
          }
          .like i {
            background-position: -120px -110px;
          }
          .view i {
            background-position: -160px -110px;
          }
        }
        .message {
          height: 90px;
          padding: 0 16px;
          margin: 10px 0 24px 0;
          font-size: 17px;
          color: #666;
        }
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
</style>
