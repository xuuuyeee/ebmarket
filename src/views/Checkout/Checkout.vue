<template>
  <div class="wrapper" style="position: relative; background-color: #fff">
    <div class="checkout">
      <h3 class="box-title">收货地址</h3>
      <div class="box-body">
        <div class="checkout-address">
          <div class="text">
            <ul v-if="!isNone">
              <li><span>收货人：</span>{{ addressForm.consignee }}</li>
              <li><span>收货人电话：</span>{{ addressForm.telephone }}</li>
              <li><span>收货人地址：</span>{{ addressForm.position }}</li>
            </ul>
            <a
              href="javascript:"
              class="changePosition"
              v-if="!isNone"
              @click="
                dialog = 2;
                methodWay = 1;
              "
            >修改地址</a>
            <div class="none" v-else>您需要先添加收货地址才可提交订单。</div>
          </div>
          <div class="action">
            <button class="addressBtn" @click="dialog = 1">切换地址</button>
            <button class="addressBtn" @click="dialog = 2; methodWay = 2;">
              添加地址
            </button>
          </div>
        </div>
        <!-- 获取收货地址 -->
        <div
          class="dialog"
          :style="{ display: dialog === 1 ? 'block' : 'none' }"
          :class="{ 'body-fade': dialog === 1 }"
        >
          <div class="dia-wrapper" :class="{ 'dia1-fade': dialog === 1 }">
            <div class="header">
              <h3>切换收货地址</h3>
            </div>
            <div class="body">
              <div
                class="item"
                v-for="(obj, index) in addressTable"
                :key="index"
                :style="{
                  'border-color': dialogClick === index ? '#27ba9b' : 'f5f5f5',
                  'background-color':
                    dialogClick === index ? '#e6faf6' : '#fff',
                }"
                @click="dialogClick = index"
              >
                <ul>
                  <li><span>收货人：</span>{{ obj.consignee }}</li>
                  <li><span>收货人电话：</span>{{ obj.telephone }}</li>
                  <li><span>地址：</span>{{ obj.position }}</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              <button class="cancelBtn" @click="dialog = 0">取消</button>
              <button class="submitBtn" @click="changePosition(dialogClick)">
                确认
              </button>
            </div>
          </div>
        </div>
        <!-- 添加 -->
        <div
          class="dialog"
          :style="{ display: dialog === 2 ? 'block' : 'none' }"
          :class="{ 'body-fade': dialog === 2 }"
        >
          <div class="dia-wrapper" :class="{ 'dia2-fade': dialog === 2 }">
            <div class="header">
              <h3>添加收货地址</h3>
              <a href="javascript:"></a>
            </div>
            <div class="body">
              <el-form ref="form" :model="addressForm" label-width="110px">
                <el-form-item label="收货人姓名">
                  <el-input v-model="addressForm.consignee"></el-input>
                </el-form-item>
                <el-form-item label="收货人电话号码">
                  <el-input v-model="addressForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="收货人地址">
                  <el-input v-model="addressForm.position"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="footer">
              <div class="action">
                <button class="cancelBtn" @click="dialog = 0">取消</button>
                <button class="submitBtn" @click="updateAddress()">确认</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="box-title">商品信息</h3>
      <div class="box-body">
        <el-table :data="cartItemFrontVoList">
          <el-table-column label="商品信息" width="400" align="center">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <el-image
                  :src="BaseUrl + scope.row.imagePosition"
                  style="width: 100px; height: 100px; display: inline-block"
                ></el-image>
                <div class="goods_name">
                  <span>{{ scope.row.prodName }}</span>
                  <br/>
                  <span>{{ scope.row.attr }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价" align="center" prop="price">
            <template slot-scope="scope">
              <span>￥{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column label="小计" align="center">
            <template slot-scope="scope">
              <span>￥{{ subTotal(scope.row.price, scope.row.count) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <h3 class="box-title">支付方式</h3>
      <div class="box-body" style="background-color: rgba(42, 42, 42, 0.1)">
        <input
          type="radio"
          id="WeChatPay"
          value="WeChatPay"
          v-model="payment"
          class="checkbox_payment"
          style="margin-top: 0"
        />
        <label for="WeChatPay" class="checkbox_payment_label">微信支付</label>
        <input
          type="radio"
          id="AliPay"
          value="AliPay"
          v-model="payment"
          class="checkbox_payment"
          style="margin-top: 0"
        />
        <label for="AliPay" class="checkbox_payment_label">支付宝支付</label>
      </div>
      <h3 class="box-title">金额明细</h3>
      <div class="box-body div_center">
        <div class="total">
          <dl>
            <dt>商品件数：</dt>
            <dd>{{ totalCount() }}件</dd>
          </dl>
          <dl>
            <dt>商品总价：</dt>
            <dd class="totalPrice">￥{{ totalPrice() }}</dd>
          </dl>
        </div>
      </div>
      <div class="submit">
        <button class="submitBtn" @click="placeOrder()">结账付款</button>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/api/index'
import { BaseUrl } from '@/api/util'

export default {
  created() {
    this.cartItemFrontVoList = JSON.parse(
      localStorage.getItem('cartItemFrontVoList')
    )
    this.cartItemSelectList = Array.from(this.cartItemFrontVoList, ({ cartItemId }) => cartItemId)
    service({
      url: '/address/getByUser',
      method: 'GET',
      params: {
        id: JSON.parse(localStorage.getItem('userInfo')).id
      }
    }).then((res) => {
      this.addressTable = Array.from(res.data)
      this.addressForm = this.addressTable[0] // 把第一条地址赋给addressForm
    })
  },
  data() {
    return {
      addressForm: {
        consignee: '',
        telephone: '',
        position: ''
      },
      payment: '',
      dialog: 0,
      addressTable: [],
      dialogClick: -1,
      methodWay: 0,
      cartItemFrontVoList: [],
      cartItemSelectList: [],
      BaseUrl
    }
  },
  methods: {
    changePosition(index) {
      this.addressForm.position = this.addressTable[index].position
      this.addressForm.consignee = this.addressTable[index].consignee
      this.addressForm.telephone = this.addressTable[index].telephone
      this.addressForm.id = this.addressTable[index].id
      this.dialog = 0
    },
    updateAddress() {
      const telRule = /^[1][3-9][0-9]{9}$/
      if (this.addressForm.consignee.trim() === '') {
        this.$message.warning('请填写收件人')
        return
      }
      if (!telRule.test(this.addressForm.telephone)) {
        this.$message.warning('请填写正确的电话')
        return
      }
      if (this.addressForm.position.trim() === '') {
        this.$message.warning('请填写地址')
        return
      }

      // console.log(this.addressForm)
      // console.log(this.methodWay)
      // return

      if (this.methodWay === 1) {
        service({
          url: '/address',
          method: 'PUT',
          data: {
            ...this.addressForm
          }
        }).then((res) => {
          this.$message('收货人信息修改成功')
          this.dialog = 0
          this.methodWay = 0
          const index = this.addressTable.findIndex(
            (item) => item.id === res.data.id
          )
          this.$set(this.addressTable, index, { ...this.addressForm })
        })
      } else if (this.methodWay === 2) {
        // this.addressForm.consignee = ''
        // this.addressForm.position = ''
        // this.addressForm.telephone = ''
        service({
          url: '/address',
          method: 'POST',
          data: {
            consignee: this.addressForm.consignee,
            telephone: this.addressForm.telephone,
            position: this.addressForm.position,
            userId: JSON.parse(localStorage.getItem('userInfo')).id
          }
        }).then((res) => {
          console.log(res)
          this.$message('收货人信息添加成功')
          // this.addressTable.push({ ...this.addressForm })
          service({
            url: '/address/getByUser',
            method: 'GET',
            params: {
              id: JSON.parse(localStorage.getItem('userInfo')).id
            }
          }).then((res) => {
            this.addressTable = Array.from(res.data)
            this.addressForm = this.addressTable[0] // 把第一条地址赋给addressForm
          })
          this.dialog = 0
          this.methodWay = 0
        })
      }
    },
    subTotal(count, price) {
      return count * price
    },
    totalCount() {
      return this.cartItemFrontVoList.reduce(
        (sum, item) => sum + item.count,
        0
      )
    },
    totalPrice() {
      return this.cartItemFrontVoList.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      )
    },
    placeOrder() {
      if (this.payment === '') {
        this.$alert('请选择支付方式')
      } else {
        console.log(this.cartItemSelectList)
        service.defaults.headers['Content-Type'] = 'application/json'
        service({
          url: '/order/placeOrder',
          method: 'PUT',
          data: JSON.stringify(this.cartItemSelectList),
          params: {
            user_id: JSON.parse(localStorage.getItem('userInfo')).id,
            consignee: this.addressForm.consignee,
            telephone: this.addressForm.telephone,
            position: this.addressForm.position,
            payment: this.payment,
            total_count: this.totalCount(),
            total_price: this.totalPrice()
          }
        }).then((res) => {
          console.log(res)
          this.$message.success('下单成功')
          const endPoints = []
          for (const cartItemSelectListKey of this.cartItemSelectList) {
            endPoints.push(service({
              url: '/cartItem',
              method: 'DELETE',
              params: {
                id: cartItemSelectListKey
              }
            }))
          }
          Promise.all(endPoints).then(() => {
            console.log('已从购物车中移除订单商品')
          })
          this.$router.push({ name: 'userOrder' })
        })
      }
    }
  },
  computed: {
    isNone() {
      const i = Object.values(this.addressForm).filter(
        (item) => item === ''
      ).length
      return i !== 0
    }
  }
}
</script>
<style lang="less" scoped>
.goods_name {
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  line-height: 160%;
  margin: 7% 7% 0 7%;
}

.checkbox_payment {
  width: 20px;
  margin-left: 25%;
}

.div_center {
  font-family: Calibri sans-serif;
  font-size: 20px;
}

.checkout {
  padding: 0 20px;

  .box-title {
    font-size: 16px;
    font-weight: normal;
    padding-left: 10px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
  }

  .box-body {
    padding: 20px 0;

    .checkout-address {
      border: 1px solid #f5f5f5;
      display: flex;
      align-items: center;

      .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        > ul {
          flex: 1;
          padding: 20px;

          li {
            line-height: 30px;

            span {
              color: #999;
              margin-right: 5px;
            }
          }
        }

        .none {
          line-height: 90px;
          color: #999;
          text-align: center;
          width: 100%;
        }

        .changePosition {
          color: #27ba9b;
          width: 160px;
          text-align: center;
          height: 90px;
          line-height: 90px;
          border-right: 1px solid #f5f5f5;
        }
      }

      .action {
        width: 420px;
        text-align: center;

        .addressBtn {
          width: 140px;
          height: 46px;
          line-height: 44px;
          font-size: 14px;
          color: #666;
          border-radius: 4px;
          cursor: pointer;
          background: #fff;
          border: 1px solid #e4e4e4;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }

    .dialog {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 8887;
      background: rgba(0, 0, 0, 0);

      .dia-wrapper {
        width: 600px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        opacity: 0;
      }

      .dia1-fade {
        transition: all 0.4s;
        transform: translate(-50%, -50%);
        opacity: 1;
      }

      .dia2-fade {
        transition: all 0.4s;
        transform: translate(-50%, -50%);
        opacity: 1;
        width: 780px;
      }

      .header {
        position: relative;
        height: 70px;
        line-height: 70px;
        padding: 0 20px;
        border-bottom: 1px solid #f5f5f5;

        h3 {
          font-weight: normal;
          font-size: 18px;
        }

        // .closeBtn {
        //   position: absolute;
        //   right: 25px;
        //   top: 25px;
        //   font-size: 24px;
        //   width: 20px;
        //   height: 20px;
        //   line-height: 20px;
        //   text-align: center;
        //   color: #999;
        // }
      }

      .body {
        padding: 20px 40px;
        font-size: 16px;

        .item {
          border: 1px solid #f5f5f5;
          margin-bottom: 10px;
          cursor: pointer;
          flex: 1;
          min-height: 90px;
          display: flex;
          align-items: center;

          > ul {
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
          }

          &:hover {
            border-color: #27ba9b;
            background: #e6faf6;
          }
        }
      }

      .footer {
        text-align: center;
        padding: 10px 0 30px 0;

        .cancelBtn {
          margin-right: 20px;
          background: #ccc;
          color: #fff;
          width: 180px;
          height: 50px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          text-align: center;
          border: 1px solid #ccc;
        }

        .submitBtn {
          margin-right: 20px;
          background: #27ba9b;
          color: #fff;
          width: 180px;
          height: 50px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          text-align: center;
          border: 1px solid #27ba9b;
        }
      }
    }

    .body-fade {
      transition: all 0.4s;
      background: rgba(0, 0, 0, 0.5);
    }

    .payment {
      width: 228px;
      height: 50px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 48px;
      margin-right: 25px;
      color: #666666;
      display: inline-block;
    }

    .total {
      dl {
        display: flex;
        justify-content: flex-end;
        line-height: 50px;

        dt {
          display: block;
        }

        dd {
          width: 240px;
          text-align: right;
          padding-right: 70px;
        }

        .totalPrice {
          font-size: 20px;
          color: #cf4444;
        }
      }
    }
  }

  .submit {
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;

    .submitBtn {
      background: #27ba9b;
      color: #fff;
      width: 180px;
      height: 50px;
      font-size: 16px;
      text-align: center;
      border: 1px solid #27ba9b;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
