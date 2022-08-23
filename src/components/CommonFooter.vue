<template>
  <div class="footer">
<!--    <div class="contact wrapper clearfix">-->
<!--        <dl>-->
<!--          <dt>客户服务</dt>-->
<!--          <dd class="chat">在线客服</dd>-->
<!--          <dd class="feedback">问题反馈</dd>-->
<!--        </dl>-->
<!--        <dl>-->
<!--          <dt>关注我们</dt>-->
<!--          <dd class="weixin">公众号</dd>-->
<!--          <dd class="weibo">微博</dd>-->
<!--        </dl>-->
<!--        <dl>-->
<!--          <dt>下载APP</dt>-->
<!--          <dd class="qrcode">-->
<!--            <img src="@/assets/uploads/qrcode.png" alt="">-->
<!--          </dd>-->
<!--          <dd class="download">-->
<!--            <span>扫描二维码</span>-->
<!--            <span>立马下载APP</span>-->
<!--            <a href="javascript:;">下载页面</a>-->
<!--          </dd>-->
<!--        </dl>-->
<!--        <dl>-->
<!--          <dt>服务热线</dt>-->
<!--          <dd class="hotline">-->
<!--            400-0000-000-->
<!--            <small>周一至周日 8:00-18:00</small>-->
<!--          </dd>-->
<!--        </dl>-->
<!--    </div>-->
    <div class="extra">
      <div class="wrapper">
        <div class="slogan">
          <a href="javascript:" class="price">价格亲民</a>
          <a href="javascript:" class="express">物流快捷</a>
          <a href="javascript:" class="quality">品质新鲜</a>
        </div>
        <div class="copyright">
          <p>CopyRight © 企业云业务超市</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonFooter'
}
</script>

<style lang="less" scoped>
  .footer {
    background: #fff;
    border-top: 1px solid #e4e4e4;
    margin-top: 15px;
    .contact {
      padding: 60px 0 40px 25px;
      dl {
        float: left;
        height: 190px;
        text-align: center;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        color: #999;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: none;
          padding-right: 0;
        }
        dt {
          font-size: 18px;
        }
        dd {
          float: left;
          margin: 36px 12px 0 0;
        }
        .chat,
        .feedback,
        .weixin,
        .weibo {
          display: inline-block;
          width: 92px;
          height: 92px;
          padding-top: 20px;
          border: 1px solid #ededed;
          &::before {
            content: "";
            display: block;
            width: 40px;
            height: 30px;
            margin: 0 auto 8px;
            background-image: url('~@/assets/images/sprites.png');
          }
        }
        .chat {
          &::before {
            background-position: -245px -70px;
          }
          &:hover {
            &::before {
              background-position: -200px -70px;
            }
          }
        }
        .feedback {
          margin-right: 0;
          &::before {
            background-position: -345px -70px;
          }
          &:hover {
            &::before {
              background-position: -295px -70px;
            }
          }
        }
        .weixin {
          &::before {
            background-position: -247px -15px;
          }
          &:hover {
            &::before {
              background-position: -202px -15px;
            }
          }
        }
        .weibo {
          margin-right: 0;
          &::before {
            background-position: -347px -15px;
          }
          &:hover {
            &::before {
              background-position: -297px -15px;
            }
          }
        }
        .qrcode {
          width: 92px;
          height: 92px;
          padding: 7px;
          border: 1px solid #ededed;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .download {
          padding-top: 5px;
          font-size: 14px;
          span {
            display: block;
          }
          a {
            display: block;
            padding: 10px 25px;
            margin-top: 5px;
            color: #fff;
            background-color: #5eb69c;
            border-radius: 2px;
            line-height: 1;
          }
        }
        .hotline {
          padding-top: 20px;
          font-size: 22px;
          color: #666;
          small {
            display: block;
            font-size: 15px;
            color: #999;
          }
        }
      }
    }
    .extra {
      background-color: #333;
      .slogan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 50px;
        border-bottom: 1px solid #434343;
        text-align: justify;
        a {
          display: inline-block;
          height: 58px;
          line-height: 58px;
          color: #fff;
          font-size: 28px;
          &::before {
            content: "";
            display: inline-block;
            width: 58px;
            height: 58px;
            margin-right: 10px;
            background-image: url('~@/assets/images/sprites.png');
            vertical-align: middle;
          }
        }
        .express {
          &::before {
            background-position: -65px 0;
          }
        }
        .quality {
          &::before {
            background-position: -130px 0;
          }
        }
      }
      .copyright {
        height: 100px;
        padding-top: 40px;
        text-align: center;
        color: #999;
        font-size: 15px;
        a {
          color: #999;
          padding: 0 10px 0 6px;
          &:hover {
            color: #27ba9b;
          }
        }
        p {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
