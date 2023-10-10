<template>
  <div class="header">
    <div class="wyy_top">
      <div class="wyy_logo">
        <h1>
          <span class="logo_img"></span>
          <span class="logo_title">网易云音乐</span>
        </h1>
      </div>
      <div class="wyy_search">
        <!-- 前进回退按钮 -->
        <div class="history">
          <span class="history_back" @click="$router.back()"
            ><i class="iconfont">&#xe685;</i></span
          >
          <span class="history_next" @click="$router.go(1)"
            ><i class="iconfont">&#xe688;</i></span
          >
        </div>
        <!-- 搜索模块 -->
        <div class="search_box" ref="search_box">
          <div
            class="search_btn"
            @click="defaultSearchFn"
          >
            <i class="iconfont">&#xe600;</i>
          </div>
          <!-- 搜索按钮 -->
          <input
            type="text"
            class="search_input iconfont"
            v-model="searchValue"
            :placeholder="defaultSearch.realkeyword"
            @focus="searchBox = true"
            @input="searchShowFn"
            @keyup.enter="SubmitFn"
            @keyup.esc="deleteValueFn(), searchShowFn()"
          />
          <!-- 搜索子路由显示 -->
          <div class="search_show" v-if="searchBox">
            <!-- 搜索历史 -->
            <searchHistory
              v-if="searchShow"
              :searchHistories="searchHistories"
              @inputSearch="inputSearch"
            />
            <!-- 搜索建议 -->
            <!-- v-else -->
            <searchSuggestion v-else :searchValue="searchValue" />
          </div>

          <div class="search_voice"><i class="iconfont">&#xe647;</i></div>
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="wyy_username">
        <ul class="usermessage">
          <li class="userPhoto">
            <div>
              <a :style="{backgroundImage:`url(${profile.avatarUrl ? profile.avatarUrl : 'https://test-1306735889.cos.ap-guangzhou.myqcloud.com/%E6%9C%AA%E7%99%BB%E5%BD%95.jpg'})`}"></a>
            </div>
            <div @click="loginShowFn" ref="userControl">
              <em>{{profile.nickname ? profile.nickname : '未登录'}}</em>
              <span>CVIP·伍</span>
              <i class="iconfont">&#xe687;</i>
              <userControl v-model="userControlShow" v-if="userControlShow" @inform='inform'/>
            </div>
          </li>
          <li>
            <a href="javascript:;"><i class="iconfont">&#xe8c7;</i></a>
          </li>
          <li>
            <a href="javascript:;"><i class="iconfont">&#xe68f;</i></a>
          </li>
          <li>
            <a href="javascript:;"><i class="iconfont">&#xe908;</i></a>
          </li>
        </ul>
        <ul class="usershut">
          <li>
            <a href="#"><i class="iconfont">&#xe686;</i></a>
          </li>
          <li>
            <a href="#"><i class="iconfont">&#xe686;</i></a>
          </li>
          <li>
            <a href="#"><i class="iconfont">&#xe686;</i></a>
          </li>
          <li>
            <a href="#"><i class="iconfont">&#xe686;</i></a>
          </li>
        </ul>
      </div>

    </div>
    <Login v-model="loginShow" v-if="loginShow" @inform='inform'/>
    <!-- <div ref="userControl"> -->
       <!-- <userControl v-model="userControlShow"  ref="userControl" v-if="userControlShow" /> -->
    <!-- </div> -->

    <div style="height: 3.125rem"></div>
  </div>
</template>

<script>
import { showBox } from '@/utils/documentClick'
import userControl from './components/userControl.vue'
import Login from '@/views/Login'
import { DefaultSearchAPI } from '@/api'
import { setItem } from '@/utils/storage'
// 导入搜索子组件
import searchHistory from './components/search-history.vue'
import searchSuggestion from './components/search-suggestion.vue'
export default {
  name: 'HeaderIndex',
  data () {
    return {
      loginShow: false, // 登录界面
      userControlShow: false, // 用户简洁信息
      searchValue: '', // 搜索内容
      searchBox: false, // 搜索界面的大盒子
      searchShow: true, // 搜索历史与搜索建议显示隐藏
      searchHistories: [], // 存储历史记录
      defaultSearch: '', // 默认搜索建议
      profile: this.$store.getters.profile ?? ''
    }
  },
  components: {
    searchHistory,
    searchSuggestion,
    Login,
    userControl

  },
  computed: {
  },
  async created () {
    this.onDefaultSearch()
    const {
      data: { data }
    } = await DefaultSearchAPI()
    this.defaultSearch = data
  },
  mounted () {
    // if (this.searchBox) {
    document.addEventListener('click', (e) => { this.searchBox = showBox(this.$refs.search_box, this.searchBox, e) })
    // }
  },
  methods: {
    // 控制盒子显示隐藏
    searchShowFn () {
      if (this.searchValue.trim().length > 0) {
        this.searchShow = false
      } else {
        this.searchShow = true
      }
    },
    deleteValueFn () {
      this.searchValue = ''
    },
    // 搜索提交处理
    SubmitFn () {
      this.searchHistories.unshift(this.searchValue)
      const arr = this.searchHistories
      setItem('searchHistories', arr)
    },
    // 搜索历史传值
    inputSearch (item) {
      this.searchValue = item
      this.searchShowFn()
    },
    // 默认搜索跳转
    defaultSearchFn () {
      this.searchValue = this.defaultSearch.realkeyword
      this.$router.push({ path: '/search', query: { value: `${this.searchValue}` } })
    },
    // 2分钟调用一次默认搜索建议
    onDefaultSearch () {
      setInterval(async () => {
        const {
          data: { data }
        } = await DefaultSearchAPI()
        this.defaultSearch = data
      }, 200000)
    },
    inform (data) {
      this.profile = data.profile
    },
    // 判断是否登录
    loginShowFn () {
      if (!this.profile) {
        this.loginShow = true
      } else {
        this.userControlShow = true
        document.addEventListener('click', (e) => {
          this.userControlShow = showBox(this.$refs.userControl, this.userControlShow, e)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
//  头部模块
.wyy_top {
  position: fixed;
  top: 0;
  color: #fff;
  z-index: 11;
  width: 100%;
  display: flex;
  background-color: @hedfot;
  // background-color: pink;
  align-items: center;
  height: 3.125rem;
  border-bottom: 2px solid rgb(209, 27, 27);
  // logo模块
  .wyy_logo {
    min-width: 105px;
    cursor: pointer;
    padding: 0.833rem 0rem 0.833rem 0.833rem;
    h1 {
      display: flex;
      align-items: center;
      .logo_img {
        display: inline-block;
        width: 1.367rem;
        height: 1.367rem;
        background: url('~@/images/logo.jpg') no-repeat 0 0 / contain;
        background-size: 101% 101%;
        border-radius: 50%;
        vertical-align: text-top;
      }
      .logo_title {
        display: inline-block;
        color: #fff;
        padding-left: 0.182rem;
        vertical-align: middle;
        font-size: 0.667rem;
      }
    }
  }

  // 搜索模块
  .wyy_search {
    display: flex;
    width: 15.125rem;
    margin-left: 10rem;
    // 历史按钮箭头
    .history {
      display: flex;
      align-items: center;
      min-width: 45px;
      cursor: pointer;
      span {
        display: block;
        width: 1.067rem;
        height: 1.067rem;
        line-height: 1.067rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.667rem;
        // background-color: #2a2a2d;
      }
      .history_back {
        color: #fff;
        margin-right: 0.5rem;
      }
      .history_next {
        color: #69696b;
      }
    }
    .search_box {
      // 搜索按钮
      position: relative;
      display: flex;
      align-items: center;
      height: 3.125rem;
      margin-left: 0.521rem;
      cursor: pointer;
      .search_btn {
        width: 1.667rem;
        height: 1.458rem;
        text-align: center;
        line-height: 1.458rem;
        background-color: #2a2a2d;
        border-top-left-radius: 1.167rem;
        border-bottom-left-radius: 1.167rem;
        i {
          color: #fff;
          font-size: 0.651rem;
        }
      }
      .search_input {
        color: #696b6b;
        font-size: 0.867rem;
        width: 7.5rem;
        height: 1.458rem;
        background-color: #2a2a2d;
        border-top-right-radius: 1.167rem;
        border-bottom-right-radius: 1.167rem;
      }
      .search_show {
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        // 为什么这里设置z-index没有呢
        // ，应为父元素的层级永远比导航栏低，
        // 所以需要吧父亲的层级提高
        top: 110%;
        left: -37%;
        width: 17.75rem;
        min-width: 254px;
        max-height: 700px;
        min-height: 400px;
        height: 29.1667rem;
        padding: 0.4167rem 0.8333rem;
        border-radius: 0.4167rem;
        background-color: #363636;
        // 到格式化父盒子里使用样式
        /deep/ .van-cell {
          background-color: transparent !important;
          padding: 0 !important ;
          &::after {
            position: static;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            right: 0;
            bottom: 0;
            left: 0;
            border: none;
            -webkit-transform: none;
            transform: none;
          }
        }
        .van-cell__value {
          flex: unset;
        }
        &::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 0.2083rem;
          /*高宽分别对应横竖滚动条的尺寸*/
          // height: 5px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 0.4167rem;
          // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: #e2dcdc;
        }
      }

      .search_voice {
        margin-left: 0.26rem;
        width: 1.458rem;
        height: 1.458rem;
        border-radius: 50%;
        text-align: center;
        line-height: 1.458rem;
        color: #fff;
        background-color: #1e1e21;
      }
    }
  }

  // 用户模块
  .wyy_username {
    margin-left: auto;
    display: flex;
    align-items: center;
    i {
      color: #fff;
    }
    ul {
      display: flex;
      cursor: pointer;
      // margin-right: 0.833rem;
    }
    .usermessage {
      min-width: 223px;
      .userPhoto {
        & > * {
          padding-right: 0.13rem;
        }
        font-size: 0.469rem;
        div {
          display: inline-block;
          a {
            display: inline-block;
            width: 1.458rem;
            height: 1.458rem;
            background: url('~@/images/头像.jpg') no-repeat center/contain;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        span {
          color: #fff;
          border-radius: 0.09rem;
          height: 0.469rem;
          padding: 0.056rem 0.13rem;
          font-size: 0.365rem;
          text-align: center;
          background-color: #020201;
        }
        i {
          font-size: 0.469rem;
        }
      }
      li {
        padding: 0 0.26rem;
        line-height: 1.458rem;
        &:nth-child(3),
        &:last-child {
          i {
            font-size: 0.656rem;
          }
        }
      }
    }
    .usershut {
      margin-right: 0.26rem;
      justify-content: space-around;
      width: 5.469rem;
    }
  }
}
</style>
