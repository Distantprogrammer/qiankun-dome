<template>
  <div class="userControl" v-if="userDetail">
    <div class="userControl_stats">
      <div class="userControl-item">
        <span class="count">{{ userDetail.profile.eventCount }}</span>
        <span class="text">动态</span>
      </div>
      <div class="userControl-item">
        <span class="count">{{ userDetail.profile.follows }}</span>
        <span class="text">关注</span>
      </div>
      <div class="userControl-item">
        <span class="count">{{ userDetail.profile.followeds }}</span>
        <span class="text">粉丝</span>
      </div>
    </div>
    <div class="signIn">
      <button><i class="iconfont icon-qiandao_o"></i> 签到</button>
    </div>
    <div class="userControl_serve">
      <ul>
        <li>
          <div>
            <span><i class="iconfont icon-iconjp"></i> 我的会员</span> <span><i class="iconfont icon-arrow-right-bold"></i></span>
          </div>
        </li>
        <li>
          <div>
            <span><i class="iconfont icon-dengji"></i> 等级</span> <span><em>Lv. </em> {{userDetail.level}} <i class="iconfont icon-arrow-right-bold"></i></span>
          </div>
        </li>
        <li>
          <div>
            <span><i class="iconfont icon-shouye"></i> 商城</span>
          </div>
        </li>
        <li>
          <div>
            <span><i class="iconfont icon-gerenxinxi"></i> 个人信息设置</span>
          </div>
        </li>
        <li>
          <div>
            <span><i class="iconfont icon-bangdingzhanghao"></i> 绑定社交账号</span>
          </div>
        </li>
        <li>
          <div>
            <span><i class="iconfont icon-kefu"></i> 我的客服</span>
          </div>
        </li>
        <li @click="logout">
          <div>
            <span><i class="iconfont icon-tuichu"></i> 退出登录</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { userDetailAPI, userAccountAPI, vipInfoAPI, logoutAPI } from '@/api'
import { mapGetters } from 'vuex'
import { reomveItem } from '@/utils/storage'
import { removeCookie } from '@/utils/auth'
// import { showBox } from '@/utils/documentClick'
export default {
  name: 'userControl',
  model: {
    prop: 'userControlShow'
  },
  props: {
    userControlShow: {
      type: Boolean
    }
  },
  data () {
    return {
      userDetail: '', // 用户详情
      vipInfo: '' // vip 信息
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    this.getuserDetail()
    // this.getuserAccount()
    // this.getvipInfo()
  },
  mounted () {},
  methods: {
    // 用户详情
    async getuserDetail () {
      try {
        const { data } = await userDetailAPI(this.userId)
        this.userDetail = data
      } catch (error) {
        this.$message.error('你登陆了吗？还是网络问题，不会是我代码出问题了吧')
      }
    },
    // 账号信息
    async getuserAccount () {
      await userAccountAPI(this.userId)
    },
    // vip信息
    async getvipInfo () {
      try {
        const { data } = await vipInfoAPI()
        console.log(data)
        if (data.code === 302) {
          this.$message.error(data.message)
        } else {
          this.vipInfo = data
        }
      } catch (error) {
        this.$message.error('获取vip数据失败')
      }
    },
    async logout () {
      try {
        await logoutAPI()
        reomveItem('wyy-cookies')
        reomveItem('userInfo')
        removeCookie('wyy-cookies')
        this.$emit('inform', '')
        this.$store.state.cookies = ''
        this.$store.state.userInfo = ''
        this.$message.success('退出成功')
      } catch (error) {
        this.$message.error('退出失败')
      }
    }

  }
}
</script>

<style lang="less" scoped>
.userControl {
  position: absolute;
  top: 100%;
  right: 6%;
  width: 280px;
  height: 412px;
  padding: 23px 0px 15px 0px;
  background-color: @popoverBC;
  color: @navBar;
  border-radius: 10px;
  .userControl_stats {
    display: flex;
    padding: 0 20px;
    .userControl-item {
      // height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .count {
        color: @navBar;
        font-weight: 600;
        font-size: 20px;
      }
      .text {
        font-size: 14px;
        color: @fontsize;
      }
    }
  }
  .signIn {
    margin-top: 10px;
    button {
      display: block;
      margin: 0 auto;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 14px;
      border: 1px @btnBorder solid;
      background-color: transparent;
    }
  }
  .userControl_serve {
    margin-top: 12px;
    ul {
      li {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        &:hover {
          background-color: @hover;
        }
        &:first-child div,
        &:nth-child(4) div,
        &:nth-child(6) div,
        &:nth-child(7) div {
          border-top: 1px @btnBorder solid;
        }
        div {
          display: flex;
          justify-content: space-between;
          width: 100%;
          span{
            &:nth-child(2){
              color: @fontsize;
              em{
              font-style: italic;
            }
            }
          }
        }
      }
    }
  }
}
</style>
