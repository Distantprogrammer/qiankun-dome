<template>
  <div class="login" v-if="loginShow">
    <van-nav-bar @click-right="onClickRight">
      <template #right>
        <span class="el-icon-close"></span>
        <!-- <van-icon name="search" size="18" /> -->
      </template>
    </van-nav-bar>
   <div class="loginMain">
    <van-row> <h1>扫码登录</h1></van-row>
    <van-row> <img :src="QRBase64" alt=""></van-row>
    <van-row> <span>使用<a href="#">网易云APP扫码登录</a></span></van-row>
    </div>
    <van-row class="pattern"> 选择其他登录模式</van-row>
  </div>
</template>

<script>
import { QRkeyAPI, QRcreateAPI, QRcheckAPI, loginStatusAPI } from '@/api'
import { mapMutations } from 'vuex'
// import { getItem } from '@/utils/storage'
export default {
  name: 'login',
  model: {
    prop: 'loginShow'
  },
  props: {
    loginShow: Boolean
  },
  data () {
    return {
      QRKey: '',
      QRBase64: '',
      cookier: '',
      timer: null,
      loginMsg: ''
    }
  },
  created () {
    this.loginQR()
  },
  methods: {
    ...mapMutations(['user/setcookies', 'user/setUserInfo']),
    // 关闭
    onClickRight () {
      this.$emit('input', false)
      // console.log(111)
    },
    async loginQR () {
      // eslint-disable-next-line no-unused-vars
      const timestamp = Date.now()
      // this.getLoginStatus(cookie)
      // 获取key
      await this.getQRkeyAPI()
      // 创建二维码
      await this.getQRcreateAPI(this.QRKey)
      this.timer = setInterval(async () => {
        // 判断扫码状态
        const statusRes = await this.getQRcheckAPI(this.QRKey)
        // console.log(statusRes)
        // console.log(statusRes.code)
        if (statusRes.code === 800) {
          this.$message('二维码已过期,请重新获取')
          clearInterval(this.timer)
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          clearInterval(this.timer)
          this.$message('授权登录成功')
          // this.$parent.getLoginStatus(statusRes.cookie)
          await this.getLoginStatus(statusRes.cookie)
          // 设置到vuex里处理
          this['user/setcookies'](statusRes.cookie)
        }
      }, 3000)
    },
    // 获取key
    async getQRkeyAPI () {
      try {
        const { data: { data: { unikey } } } = await QRkeyAPI()
        await this.getQRcreateAPI(unikey)
        this.QRKey = unikey
        // this.getQRcheckAPI(unikey)
      } catch (error) {
        this.$message('获取二维码失败')
      }
    },
    // 二维码生成接口
    async getQRcreateAPI (key) {
      const { data: { data } } = await QRcreateAPI(key)
      this.QRBase64 = data.qrimg
    },
    // 二维码检测扫码状态接口
    async getQRcheckAPI (key) {
      const { data } = await QRcheckAPI(key)
      return data
    },
    // 登录状态
    async getLoginStatus (cookie = '') {
      const { data: { data } } = await loginStatusAPI(cookie)
      console.log(data)
      this['user/setUserInfo'](data)
      this.$emit('inform', data)
      clearInterval(this.timer)
      this.$emit('input', false)
    },
    // 重新获取二维码
    afreshGetQR () {
      console.log('重新获取二维码')
      this.getLoginQRImg()
      this.codeIsValid = true
    }
  },
  // 清除定时器
  beforeDestroy () {
    console.log(111)
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  width: 350px;
  height: 530px;
  background-color: #fff;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .van-hairline--bottom::after {
    border: none;
  }
  .loginMain{
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-row{
      margin: 20px 0;

    }
  }
  .pattern{
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
  }
}
</style>
