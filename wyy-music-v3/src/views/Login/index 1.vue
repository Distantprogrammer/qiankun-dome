<template>
  <div class="login">
    <van-nav-bar @click-right="onClickRight">
      <template #right>
        <span class="el-icon-close"></span>
        <!-- <van-icon name="search" size="18" /> -->
      </template>
    </van-nav-bar>
    <div class="loginMain">
      <van-row><img src="../../images/wyylogo.png" alt="" /></van-row>
      <van-row>
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </van-row>
      <van-row>
        <span>使用<a href="#">网易云APP扫码登录</a></span></van-row
      >
    </div>
    <van-row class="pattern"> 选择其他登录模式</van-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    // 关闭
    onClickRight () {
      console.log(111)
    }
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
  .loginMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-row {
      margin: 10px 0;
    }
  }
  .pattern {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
  }
}
</style>
