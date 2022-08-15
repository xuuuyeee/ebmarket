<template>
  <div class="register">
    <div class="wrapper">
      <div class="xtx-card">
        <h3>新用户注册</h3>
        <form class="xtx-form">
          <div class="xtx-form-item">
            <span class="iconfont icon-jurassic_user"></span>
            <input
              type="text"
              placeholder="设置用户名称"
              v-model="obj.username"
            />
          </div>
          <div class="xtx-form-item">
            <span class="iconfont icon-phone"></span>
            <input
              type="text"
              placeholder="输入手机号码"
              v-model="obj.telephone"
            />
          </div>
          <div class="xtx-form-item">
            <span class="iconfont icon-xiaoxi"></span>
            <input type="text" placeholder="输入电子邮箱" v-model="obj.email" />
          </div>
          <div class="xtx-form-item">
            <span class="iconfont icon-jiesuo"></span>
            <input
              type="password"
              placeholder="设置6至16位字母、数字和符号组合"
              v-model="obj.password"
            />
          </div>
          <div class="xtx-form-item">
            <span class="iconfont icon-jiesuo"></span>
            <input
              type="password"
              placeholder="请再次输入上面密码"
              v-model="pawordAg"
            />
          </div>
          <div class="xtx-form-item">
            <button class="submit" @click.prevent="judgeRegister()">
              立即注册
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/api/index'
export default {
  name: "MyRegister",
  data() {
    return {
      obj: {
        username: "",
        telephone: "",
        password: "",
        email: "",
      },
      pawordAg: "",
    };
  },
  methods: {
    judgeRegister() {
      const judRule = /^[a-zA-Z0-9-_]{6,16}$/;
      if (!(judRule.test(this.obj.username) && judRule.test(this.obj.password))){
        this.$alert("用户名与密码设置不符", "提示", {
          confirmButtonText: "确定",
        });
        return
      }
      const judPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!judPhone.test(this.obj.telephone)) {
        this.$alert("电话号码不符", "提示", {
          confirmButtonText: "确定",
        });
       return
      }
      const judEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!judEmail.test(this.obj.email)) {
        this.$alert("电子邮件不符", "提示", {
          confirmButtonText: "确定",
        });
        return
      }
      if (this.obj.password != this.pawordAg) {
        this.$alert("两次密码输入不一致", "提示", {
          confirmButtonText: "确定",
        });
        return
      }
      service({
        url: "/user/register",
        method: "POST",
        params:{
           ...this.obj
        }
      }).then((res)=>{
          if(res.param.code == 200){
            this.$alert("注册成功", "提示", {
            confirmButtonText: "确定",
        });
          this.$router.replace('/login')
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  padding: 50px 0;
  background-color: #f5f5f5;
  .xtx-card {
    width: 100%;
    min-height: 800px;
    background-color: #fff;
    h3 {
      height: 180px;
      padding-left: 50px;
      font-size: 26px;
      font-weight: 400;
      color: #999;
      line-height: 180px;
    }
    .xtx-form {
      padding-left: 460px;
      .xtx-form-item {
        position: relative;
        padding-bottom: 24px;
        span {
          &.iconfont {
            position: absolute;
            left: 15px;
            top: 13px;
            font-size: 18px;
            color: #999;
          }
        }
        &:nth-child(-n + 5) {
          input {
            width: 300px;
            height: 50px;
            border: 1px solid #e4e4e4;
            padding-left: 40px;
          }
        }
        .code {
          position: absolute;
          left: 210px;
          top: 16px;
          font-size: 14px;
          color: #27ba9b;
        }
        .agree {
          display: inline-block;
          width: 300px;
          font-size: 14px;
          text-align: center;
          line-height: 50px;
          .xtx-checkbox {
            color: #999;
            cursor: pointer;
            margin-right: 3px;
            margin-bottom: 2px;
            input {
              display: none;
            }
            i {
              vertical-align: middle;
              &.icon-yixuanze {
                color: #27ba9b;
              }
              &.icon-weixuanze {
                display: none;
                color: #999;
              }
            }
          }
          a {
            font-size: 14px;
            color: #27ba9b;
          }
        }
        .submit {
          width: 300px;
          height: 50px;
          border-radius: 4px;
          font-size: 16px;
          color: #fff;
          border: none;
          background: #27ba9b;
          // &:disabled {
          //   background-color: #ccc;
          //   cursor: not-allowed;
          // }
        }
      }
    }
  }
}
</style>
