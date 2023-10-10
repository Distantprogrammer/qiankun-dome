<template>
  <div class="search_result" ref="list" @scroll="clickHandel">
    <div class="search_heard">
      <h2>
        搜索 &nbsp;<span>{{ searchValue }}</span>
      </h2>
      <p>你可能感兴趣</p>
      <!-- 歌手 -->
      <SearchMay class="SearchMay" />
    </div>
    <div class="search_nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌手" name="single"><single ref="child"/></el-tab-pane>
        <el-tab-pane label="专辑" name="">专辑</el-tab-pane>
        <el-tab-pane label="视频" name="">视频</el-tab-pane>
        <el-tab-pane label="歌单" name="">歌单</el-tab-pane>
        <el-tab-pane label="歌词" name="">歌词</el-tab-pane>
        <el-tab-pane label="播客" name="">播客</el-tab-pane>
        <el-tab-pane label="声音" name="">声音</el-tab-pane>
        <el-tab-pane label="用户" name="">用户</el-tab-pane>
      </el-tabs>
      <!-- <ul class="clearfix">
        <li><router-link :to="{ path: `/searchSingle/?value=${searchValue}` }">单曲 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">歌手 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">专辑 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">视频 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">歌单 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">歌词 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">播客 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">声音 <b></b></router-link></li>
        <li><router-link :to="{ path: '/searchSingle' }">用户 <b></b></router-link></li>
        <li>找到300首歌</li>
      </ul> -->
    </div>
    <!-- <div class="search_view">
     <router-view ref="child" />
    </div> -->
  </div>
</template>

<script>
import single from './single'
// import { getItem } from '@/utils/storage'
import SearchMay from '@/views/Search/components/SearchMay.vue'
export default {
  name: 'searchResult',
  props: {},
  data () {
    return {
      songMsg: this.$route.query.value,
      listTop: 0, // 下面结果为true时记录
      searchValue: this.$route.query.value,
      activeName: 'single' // 默认tap栏
    }
  },
  components: {
    SearchMay,
    single
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了 （observed意思注意到了）
    // this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // $route: 'fetchData'
  },
  methods: {
    fetchData () {
      // this.songMsg = this.$route.query.value
      // getItem('songMsg', this.songMsg)
    },
    handleClick (tab, event) {
    },
    clickHandel (Boolean) {
      const $listHeight = this.$refs.list.scrollHeight
      const $listTop = this.$refs.list.scrollTop
      const $body = document.body.clientHeight
      const Boell = $listTop + $body >= $listHeight
      // console.log(Boell)
      if (Boell) {
        this.listTop = $listTop
        // console.log(this.listTop)
      }
      if (this.$listTop >= $listTop) return
      // 父组件触发事件同时触发子组件事件
      this.$refs.child.handleScroll(Boell)
    }
  }
}
</script>

<style lang="less" scoped>
.search_result {
  padding: 1.1667rem 0.75rem;
  min-width: 900px;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    // height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #e2dcdc;
  }
  .search_heard {
    h2 {
      color: #d0d0d0;
      font-size: 1rem;
      font-weight: 800;
      margin-bottom: 1.0417rem;
      span {
        color: #d0d0d0;
      }
    }
    p {
      color: #878787;
      font-size: 0.6833rem;
      margin-bottom: 0.5833rem;
    }
  }
  .search_nav {
    ul {
      margin-top: 0.9583rem;
      // display: flex;
      li {
        float: left;
        height: 1.4583rem;
        color: #d0d0d0;
        padding-right: 1.8333rem;
        a {
          display: block;
          position: relative;
          line-height: 1.4583rem;
          color: #d0d0d0;
          b {
            display: block;
            position: absolute;
            width: 100%;
            height: 0.1667rem;
            border-radius: 0.0833rem;
            background-color: red;
          }
        }
        &:last-child {
          padding: 0;
          float: right;
        }
      }
    }
  }
  .search_view {
    margin-top: 1.25rem;
  }
}
</style>
<style lang="less" scoped>
.el-tab {
      background-color: transparent;
    }
    /deep/.el-tabs__item {
      color: @navBar;
      font-size: .75rem;
    }
    /deep/.is-active {
      font-size: .9167rem;
      font-weight: 800;
    }
    /deep/.el-tabs__active-bar {
      height: .2083rem;
      background-color: @btnred;
    }
    /deep/ .el-tabs__nav-wrap {
      &::after {
        background-color: transparent;
      }
    }
</style>
