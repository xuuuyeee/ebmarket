<template>
  <div>
    <!-- 面包屑 -->
    <div class="wrapper good_show">
      <div class="good_media">
        <div class="good_images">
          <div
            class="large_image"
            :style="{
              display: isDisplay ? 'block' : 'none',
              'background-image': `url(${
                BaseUrl + goodInfo.list[selectedImageNum]
              })`,
              'background-positionX': `${-2 * this.layerX}px`,
              'background-positionY': `${-2 * this.layerY}px`,
            }"
          ></div>
          <div
            class="middle_image"
            @mouseenter="isDisplay = true"
            @mouseleave="isDisplay = false"
          >
            <el-image
              :src="BaseUrl + goodInfo.list[selectedImageNum]"
              style="max-width: 100%; max_height: 100%; vertical-align: middle"
            ></el-image>
            <div
              class="image_layer"
              @mousemove="calPos($event)"
              :style="{
                display: isDisplay ? 'block' : 'none',
                left: `${layerX}px`,
                top: `${layerY}px`,
              }"
            ></div>
          </div>
          <ul class="small_image" @mouseover="checkPic($event)">
            <li
              v-for="(obj, index) in goodInfo.list"
              :class="{ active_image: selectedImageNum == index }"
              :key="index"
              :data-index="index"
            >
              <el-image
                :src="BaseUrl + obj"
                style="
                  max-width: 100%;
                  max-height: 100%;
                  vertical-align: middle;
                "
              ></el-image>
            </li>
          </ul>
        </div>
        <ul class="good_sales"></ul>
      </div>
      <div class="spec">
        <p class="good_title">{{ goodInfo.good_title }}</p>
        <p class="good_desc">{{ goodInfo.good_desc }}</p>
        <p class="good_price">
          <span>{{ goodInfo.good_price.toFixed(2) }}</span>
        </p>
        <div class="goods_sku">
          <el-form>
            <el-form-item
              v-for="(obj, index) in goodInfo.goodAttribute"
              :key="index"
              :label="obj.label"
              :model="select_good_attr"
              class="required label-center-align"
            >
              <el-select
                v-model="select_good_attr[obj.label]"
                class="full-width-input"
                clearable
              >
                <el-option
                  v-for="(item, index) in obj.attrList"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div style="display: flex; align-items: center">
          <div class="elInput">数量</div>
          <el-input-number size="small" v-model="good_num"></el-input-number>
        </div>

        <button
          class="green_button addCart"
          @click="
            addCart(
              goodInfo.good_id,
              good_num,
              select_good_attr,
              goodInfo.good_price
            )
          "
        >
          加入购物车
        </button>
      </div>
    </div>
    <Recommend :recList="recList" style="background-color: #fff"></Recommend>
    <div class="wrapper" style="margin-top: 20px">
      <div class="good_tabs">
        <nav>
          <a
            href="javascript:;"
            @click="
              comName = 'GoodDetail';
              isTabClick = true;
            "
            :class="{ active_tab: isTabClick }"
          >商品详情</a
          >
          <a
            href="javascript:;"
            @click="
              comName = 'GoodComment';
              isTabClick = false;
            "
            :class="{ active_tab: !isTabClick }"
          >商品评价
            <span>{{ commentCount }}</span>
          </a>
        </nav>
        <component
          :is="comName"
          :commentList="goodInfo.commentList"
          :goodDetailList="goodInfo.good_descList"
          :goodImageList="goodInfo.goodDetailImage"
        ></component>
      </div>
    </div>
    <div class="good_warn wrapper">
      <h3>注意事项</h3>
      <p class="tit">• 如何申请退货?</p>
      <p>
        1.自收到商品之日起30日内，顾客可申请无忧退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账；
      </p>
      <p>2.内裤和食品等特殊商品无质量问题不支持退货；</p>
      <p>
        3.退货流程：
        确认收货-申请退货-客服审核通过-用户寄回商品-仓库签收验货-退款审核-退款完成；
      </p>
      <p>
        4.因小兔鲜儿产生的退货，如质量问题，退货邮费由小兔鲜儿承担，退款完成后会以现金券的形式报销。因客户个人原因产生的退货，购买和寄回运费由客户个人承担。
      </p>
    </div>
  </div>
</template>
<script>
import { BaseUrl } from '@/api/util'
import service from '@/api'
import Recommend from '../ShopCraft/Recommend/Recommend.vue'
import GoodComment from './GoodComment.vue'
import GoodDetail from './GoodDetail.vue'

export default {
  created () {
    this.sort = this.$route.params['sort']
    this.getData(this.sort)
  },
  data () {
    return {
      goodInfo: {
        good_id: -1,
        good_title: '',
        good_desc: '',
        good_price: -1,
        list: [],
        commentList: [],
        goodDetailImage: [],
        goodAttribute: {},
        good_descList: []
      },
      good_num: 1,
      selectedImageNum: 0,
      isDisplay: false,
      isTabClick: true,
      comName: 'GoodDetail',
      layerX: 0,
      layerY: 0,
      recList: [],
      BaseUrl,
      select_good_attr: {}
    }
  },
  watch: {
    $route (to, from) {
      this.sort = this.$route.params.sort
      this.getData(this.sort)
    }
  },
  methods: {
    checkPic (event) {
      if (event.target.tagName === 'IMG') {
        this.selectedImageNum =
          event.target.parentNode.parentNode.getAttribute('data-index')
      }
    },
    calPos (event) {
      const middlePos = event.target.parentNode.getBoundingClientRect()
      let x = event.pageX - middlePos.left
      let y = event.pageY - middlePos.top - document.documentElement.scrollTop
      if (x >= 0 && x <= 400 && y >= 0 && y <= 400) {
        let mx = 0,
          my = 0
        if (x < 100) mx = 0
        if (x >= 100 && x <= 300) mx = x - 100
        if (x > 300) mx = 200
        if (y < 100) my = 0
        if (y >= 100 && y <= 300) my = y - 100
        if (y > 300) my = 200
        this.layerX = mx
        this.layerY = my
      }
    },
    addCart (id, num, selectList, price) {
      if (localStorage.getItem('userInfo') !== '') {
        if (Object.values(selectList).some((item) => item.length === 0)) {
          this.$message('请选择商品的规格后再加入购物车')
          return
        }
        service({
          url: '/cart/getAll',
          method: 'GET',
          params: {
            id: JSON.parse(localStorage.getItem('userInfo')).id,
          },
        }).then((res) => {
          let { cartItemFrontVoList } = res.data
          let arrStr = Object.keys(selectList)
            .map((item, index) => {
              return item.concat(':', Object.values(selectList)[index])
            })
            .join(';')
          if (
            !cartItemFrontVoList.every(
              (item) => item.productId != id || item.attributeValue != arrStr
            )
          ) {
            let tmp = cartItemFrontVoList.find(
              (item) => item.productId == id && item.attributeValue == arrStr
            )
            num = num + tmp.count
            service({
              url: '/cartItem',
              method: 'PUT',
              data: {
                attributeValue: arrStr,
                cartId: JSON.parse(localStorage.getItem('userCartInfo')).id,
                count: num,
                productId: id,
                singlePrice: price,
                totalPrice: price * num,
                id: tmp.id,
              },
            }).then((res) => {
              this.$message('商品添加购物车完成')
            })
          } else {
            service({
              url: '/cartItem',
              method: 'POST',
              data: {
                attributeValue: arrStr,
                cartId: JSON.parse(localStorage.getItem('userCartInfo')).id,
                count: num,
                productId: id,
                singlePrice: price,
                totalPrice: price * num,
              },
            }).then((res) => {
              this.$message('商品添加购物车完成')
            })
          }
        })
      } else {
        this.$message('登录后才能购物哦')
        return
      }
    },
    getData (sort) {
      service({
        url: '/product/getOne',
        method: 'GET',
        params: {
          id: sort,
        },
      }).then((res) => {
        let {
          prodName,
          description,
          attributeList,
          price,
          id,
          mainImagePosition,
          categoryId,
          detailImagePosition,
        } = res.data
        this.goodInfo.good_id = id
        this.goodInfo.good_title = prodName
        this.goodInfo.good_price = price
        this.goodInfo.list = mainImagePosition
        this.goodInfo.goodDetailList = attributeList.split(';')[0]
        this.goodInfo.good_desc = description.split(';')[0]
        this.goodInfo.good_descList = cutString(description)
        this.goodInfo.goodDetailImage = detailImagePosition
        this.goodInfo.goodAttribute = cutAttr(attributeList)
        service({
          url: '/product/getBySame',
          method: 'GET',
          params: {
            id: categoryId,
          },
        }).then((res) => {
          this.recList = []
          for (let i = 0, j = 0; i < res.data.length; i++) {
            if ((i + 1) % 4 == 0 || i == 0) {
              this.recList.push([])
              if (i != 0) j++
            }
            this.recList[j].push({
              id: res.data[i].id,
              imgSrc: res.data[i].mainImagePosition[0],
            })
          }
          service({
            url: '/comment/getByProduct',
            method: 'GET',
            params: {
              id: this.goodInfo.good_id,
            },
          }).then((res) => {
            console.log(res.data)
            this.goodInfo.commentList = []
            for (let i = 0; i < res.data.length; i++) {
              this.goodInfo.commentList.push({
                attributeName: res.data[i].attributeName,
                description: res.data[i].description,
                level: res.data[i].level,
                username: res.data[i].username,
                createTime: res.data[i].createTime
              })
            }
          })
        })
      })
      let cutString = (str) => {
        let arr = Array.from(str.split(';').slice(1))
        if (arr[0] == '') {
          return []
        } else {
          let ans = []
          arr.forEach((item) => {
            let str = Array.from(item.split(':'))
            ans.push({
              name: str[0],
              content: str[1],
            })
          })
          return ans
        }
      }
      let cutAttr = (str) => {
        let arr = Array.from(str.split(';'))
        let ans = []
        arr.forEach((item) => {
          let tmparr = []
          let attrName = item.split(':')[0] ? item.split(':')[0] : ''
          let contentarr = Array.from(item.split(':')[1].split(','))
          contentarr.forEach((item, index) =>
            tmparr.push({
              label: `${attrName + (index + 1)}`,
              value: item,
            })
          )
          ans.push({
            label: attrName,
            attrList: tmparr,
          })
          this.$set(this.select_good_attr, attrName, '')
        })
        return ans
      }
    },
  },
  components: {
    Recommend,
    GoodDetail,
    GoodComment,
  },
  computed: {
    commentCount () {
      return this.goodInfo.commentList.length
    }
  }
}
</script>
<style lang="less" scoped>
.good_show {
  margin-bottom: 20px;
  min-height: 600px;
  background-color: #fff;
  display: flex;

  .good_media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;

    .good_images {
      width: 480px;
      height: 480px;
      position: relative;
      display: flex;
      z-index: 500;

      .large_image {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
        z-index: 3000;
      }

      .middle_image {
        width: 400px;
        height: 400px;
        background-color: #f5f5f5;
        position: relative;
        cursor: move;

        .image_layer {
          position: absolute;
          width: 200px;
          height: 200px;
          background-color: rgba(0, 0, 0, 0.2);
          left: 0;
          top: 0;
        }
      }

      .small_image {
        width: 80px;

        li {
          width: 68px;
          height: 68px;
          margin-left: 12px;
          margin-bottom: 15px;
          cursor: pointer;
        }

        .active_image {
          border: 2px solid #27ba9b;
        }
      }
    }
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;

    .good_title {
      font-size: 22px;
    }

    .good_desc {
      color: #999;
      margin-top: 10px;
    }

    .good_price {
      margin-top: 10px;

      span {
        color: #cf4444;
        margin-right: 10px;
        font-size: 22px;
      }
    }

    .goods_sku {
      padding-left: 10px;
      padding-top: 20px;

      dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;
        justify-content: left;

        dt {
          width: 50px;
          color: #999;
        }

        dd {
          flex: 1;
          color: #666;

          img {
            width: 50px;
            height: 50px;
            border: 1px solid #e4e4e4;
            margin-right: 10px;
            cursor: pointer;
          }

          span {
            display: inline-block;
            height: 30px;
            line-height: 28px;
            padding: 0 20px;
            border: 1px solid #e4e4e4;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }

    .elInput {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }
}

.good_tabs {
  width: 100%;
  min-height: 600px;
  background-color: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      > span {
        color: #cf4444;
        font-size: 16px;
        margin-left: 10px;
      }
    }

    .active_tab::before {
      content: "";
      position: absolute;
      left: 40px;
      bottom: -1px;
      width: 72px;
      height: 2px;
      background: #27ba9b;
    }
  }
}

.good_warn {
  min-height: 300px;
  background: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 40px;

  h3 {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
    padding-left: 50px;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
  }

  p {
    line-height: 40px;
    padding: 0 25px;
    color: #666;
  }

  .tit {
    color: #333;
  }
}
</style>
