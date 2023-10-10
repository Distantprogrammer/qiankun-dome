<template>
  <div class="search_single">
    <div class="search_single_btn">
      <button class="search_single_playall"  @click="play(singleMsg)">
        <span><i class="iconfont icon-bofang"></i></span>
        <span class="all">播放全部</span>
        <span><i class="iconfont icon-tianjia"></i></span>
      </button>

      <button class="search_single_download_all">
        <span><i class="iconfont icon-xiazai1"></i></span>
        <span>下载全部</span>
      </button>
    </div>
        <songList :singleMsg='singleMsg' :listTable='listTable'/>
    <div class="loading" v-if="isLoading" @click="clickFlag && onsingle()">
      {{loadingHtml}}
    </div>
  </div>
</template>

<script>
import songList from '@/components/songList.vue'
import playFn from '@/utils/play'
import { CloudSearchAPI } from '@/api'
// import { debounce } from 'lodash'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'searchSingle',
  data () {
    return {
      searchValue: '',
      offset: 0, // 偏移数量，用于分页
      singleMsg: [], // 歌曲信息
      songsRes: getItem('songsRes'), // 歌曲总信息
      isLoading: false, // 默认没有在加载数据
      time: null,
      clickFlag: false,
      loadingHtml: '加载中....',
      listTable: ['操作', '音乐标题', '歌手', '专辑', '时长', '热度'] // 表格的表头
    }
  },
  components: {
    songList
  },
  // created () {
  // },
  mounted () {
    this.onsingle()
  },
  watch: {
    $route: {
      handler: function (newVal, oldVal) {
        // 监听路由是否改变了 改变清空数据
        if (newVal !== oldVal) {
          this.singleMsg = []
          this.offset = 0
        }
        this.onsingle()
      }

    }
    // 如果路由有变化，会再次执行该方法
    // $route: 'onsingle'
  },
  methods: {
    async onsingle () {
      this.isLoading = true // 表示正在加载数据
      try {
        const res = await CloudSearchAPI({
          keywords: this.$route.query.value,
          offset: this.offset,
          limit: 30,
          type: 1
        })
        // console.log(res)
        const {
          data: {
            result: { songs }
          }
        } = res
        // 追加数据
        this.singleMsg.push(...songs)
        // }
        setItem('songsRes', res)
        this.isLoading = false
        // 判断还有数据吗
        if (this.singleMsg.length >= res.data.result.songCount) {
          this.isLoading = true
          this.loadingHtml = '没有更多了'
        } else {
          this.offset += 31
        }
        this.searchValue = this.$route.query.value
      } catch (error) {
        this.loadingHtml = '网络异常，点击重试'
        this.clickFlag = true
        console.log(error)
      }
      // 数据请求完成
      // setItem('singleMsg', songs)
    },
    handleScroll (Boolean) {
      // 如果数据有在加载中则这次请求退出
      if (this.isLoading) return
      // 已经滚动的距离加页面的高度等于整个内容区高度时,视为接触到底部
      // scrollTop 获取到顶部的滚动距离
      // clientHeight 表示页面视口高度
      // scrollHeight 页面内容的高度
      // let time = null
      if (Boolean) {
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          this.onsingle()
        }, 200)
      }
    },
    play (list) {
      playFn(list)
    }
  }
}
</script>

<style lang="less" scoped>
.search_single {
  i{
     font-size: 0.5833rem;
     padding: 0 .3333rem;
  }
  width: 100%;
  .search_single_btn {
    font-size: 0.5833rem;
  }
  .search_single_table {
    width: 100%;
    margin-top: 1.0417rem;
  }
  .search_single_playall {
    // width: 120px;
    // height: 30px;
    padding: 0.4rem 0.9167rem;
    color: rgb(72, 68, 68);
    background-color: #ec4141;
    border-radius: 2.0833rem;
  }
  .search_single_download_all {
    // width: 5.8333rem;
    // height: 1.375rem;
    padding: 0.4rem 0.9167rem;
    margin-left: 0.4167rem;
    background-color: transparent;
    border: 1px solid #4b4b4b;
    border-radius: 2.0833rem;
  }
  .search_single_list {
    width: 100%;
    // height: 20px;
    color: red;
    tr {
      &:nth-child(2n-1) {
        background-color: #2f2f2f;
      }
    }
  }
  .loading{
    width: 100%;
    text-align: center;
    margin-top: 30px;
    color: rgb(167, 151, 196);
    font-size: 1rem;
    // margin: 0 auto;
  }
}
</style>
