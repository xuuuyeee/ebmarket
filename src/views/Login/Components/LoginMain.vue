<template>
  <div class="login-main">
    <div class="wrapper">
      <div class="box">
        <div class="tab-nav">
          <a href="javascript:" class="active">账户登录</a>
        </div>
        <div class="login-form">
          <br/>
          <div class="input">
            <i class="iconfont icon-jurassic_user"></i>
            <input type="text" placeholder="请输入用户名" v-model="username"/>
          </div>
          <div class="input">
            <i class="iconfont icon-jiesuo"></i>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="agree">
            <label class="xtx-checkbox">
              <input type="checkbox" v-model="isAgree"/>
            </label>
            <span>我已同意</span>
            <a href="javascript:">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:">《服务条款》</a>
          </div>
          <div class="button">
            <a href="javascript:"
class="btn"
@click.prevent="judgeLogin()"
            >登录</a
            >
            <div class="other">
              <router-link to="/home/register">免费注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/api/index'

export default {
  name: 'LoginMain',
  data() {
    return {
      isAgree: false,
      username: '',
      password: ''
    }
  },
  methods: {
    judgeLogin() {
      const judRule = /^[a-zA-Z0-9-_]{6,16}$/
      if (this.isAgree === false) {
        this.$alert('尚未同意隐私条款与服务条款', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      if (!(judRule.test(this.username) && judRule.test(this.password))) {
        this.$alert('用户名与密码不符', '提示', {
          confirmButtonText: '确定'
        })
        this.username = ''
        this.password = ''
        return
      }
      service({
        url: '/user/login',
        method: 'POST',
        params: {
          userName: this.username,
          password: this.password
        }
      })
        .then((res) => {
          if (res.code === 1) {
            const userInfo = res.data
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            service({
              url: '/cart/getByUserId',
              method: 'GET',
              params: {
                id: res.data.id
              }
            }).then(result => {
              localStorage.setItem('userCartInfo', JSON.stringify(result.data))
            })
            this.$router.replace('/home')
          } else {
            this.$alert('用户名与密码输入错误', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .finally(() => {
          this.username = ''
          this.password = ''
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login-main {
  height: 488px;
  background-image: url("@/assets/images/login-bg.png");

  .wrapper {
    position: relative;

    .box {
      position: absolute;
      top: 60px;
      right: 100px;
      width: 380px;
      padding: 20px 40px;
      background-color: #fff;
      box-shadow: 0 0 25px 0 rgb(3 3 3 / 14%);

      .tab-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
          display: block;
          font-size: 18px;
          height: 35px;
          line-height: 35px;

          &.active {
            border-bottom: 2px solid #17bb9b;
          }
        }
      }

      .login-form {
        .link {
          text-align: right;
          padding-top: 12px;

          a {
            color: #17bb9b;
            font-size: 14px;
          }
        }

        .input {
          margin-top: 17px;
          position: relative;
          line-height: 34px;

          i {
            position: absolute;
            top: 1px;
            left: 1px;
            width: 34px;
            height: 34px;
            background-color: #cfcdcd;
            color: #fff;
            text-align: center;
            font-size: 20px;
          }

          input {
            width: 100%;
            height: 36px;
            padding: 0 49px;
            border: 1px solid #ccc;
          }
        }

        .agree {
          padding: 17px 0;
          color: #b3b3b3;
          font-size: 14px;

          .xtx-checkbox {
            color: #999;
            cursor: pointer;
            margin-right: 3px;
            margin-bottom: 2px;
          }

          a {
            font-size: 14px;
            color: #0673b1;
          }
        }

        .button {
          .btn {
            display: block;
            height: 40px;
            margin-bottom: 17px;
            background-color: #17bb9b;
            color: #fff;
            text-align: center;
            line-height: 40px;
          }

          .other {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
