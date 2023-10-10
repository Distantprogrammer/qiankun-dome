<template>
  <div
    class="songMenu"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="BoutiquePlaylist">
      <img :src="boutiquePlaylist.coverImgUrl" alt="" />
      <div>
        <el-button round>
          <i class="iconfont icon-jingpin"></i> 精品歌单
        </el-button>
        <h2>{{ boutiquePlaylist.name }}</h2>
      </div>
    </div>
    <div class="songMenuNavBar">
      <el-button round size="mini" v-popover:popover  @click="getplaylistCatlist"
        >{{ activeName }} <i class="el-icon-arrow-right"></i>
        <!-- 弹出层 -->

          <!-- 放置组件 -->
          <popover
           v-click-outside="onClickOutside"
          v-if="popoverShow"
          class="elpopover"
          v-model="activeName"
            :filterList="filterList"
            :categories="listClass.categories"
          />
      </el-button>

      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane
          :label="item.name"
          :name="item.name"
          v-for="item in playlistHot"
          :key="item.id"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 歌单组件 -->
    <songMenu v-if="topPlaylist" :topPlaylist="topPlaylist" />
    <el-row type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="page.size"
        :current-page="page.page"
        :total="page.total"
        @current-change="changePage"
      />
    </el-row>
  </div>
</template>

<script>
import {
  playlistHotAPI,
  topPlaylistAPI,
  playlistHighqualityAPI,
  playlistCatlistAPI
} from '@/api'
import popover from '../components/popover.vue'
import songMenu from '@/components/songMenu'
export default {
  name: 'songMenuIndex',
  components: {
    songMenu,
    popover
  },
  data () {
    return {
      activeName: '华语', // tab 选中项
      playlistHot: '', // 热门歌单
      boutiquePlaylist: '', // 精品歌单
      topPlaylist: JSON.parse(window.sessionStorage.getItem('topPlaylist')), // 歌单标签
      fullscreenLoading: false, // 加载动画
      page: {
        page: 1, // 当前页码
        size: 30,
        total: 0 // 总数
      },
      listClass: [], // 歌单分类数据
      filterList: [], // 过滤好的歌单分类
      popoverShow: false
    }
  },
  created () {
    this.getplaylistHot()
    this.gettopPlaylist()
    this.getplaylistHighquality()
  },
  watch: {
    async activeName () {
      this.fullscreenLoading = true
      await this.gettopPlaylist(this.activeName)
      this.getplaylistHighquality()
      this.fullscreenLoading = false
    }
  },
  methods: {
    handleClick (tab, event) {
      // this.gettopPlaylist(this.activeName)
      // console.log(tab, event)
    },
    // 热门标签
    async getplaylistHot () {
      try {
        const {
          data: { tags }
        } = await playlistHotAPI()
        this.playlistHot = tags
      } catch (error) {
        this.$message.error('请求数据失败')
        this.fullscreenLoading = false
      }
    },
    async gettopPlaylist (activeName) {
      this.fullscreenLoading = true
      const {
        data: { playlists, total }
      } = await topPlaylistAPI({
        cat: activeName ?? this.activeName,
        limit: this.page.size,
        offset: this.page.page * this.page.size
      })
      this.topPlaylist = playlists
      this.page.total = total
      window.sessionStorage.setItem(
        'topPlaylist',
        JSON.stringify(this.topPlaylist)
      )
      this.fullscreenLoading = false
    },
    // 精品歌单
    async getplaylistHighquality () {
      const {
        data: { playlists }
      } = await playlistHighqualityAPI({
        cat: this.activeName,
        limit: 1
        // before: this.topPlaylist[this.topPlaylist.length - 1].updateTime
      })
      // console.log(playlists)
      this.boutiquePlaylist = playlists[0]
    },
    // 分页
    changePage (newPage) {
      this.page.page = newPage
      this.gettopPlaylist(this.activeName)
    },
    // 获取歌单分类
    async getplaylistCatlist () {
      const { data } = await playlistCatlistAPI()
      this.listClass = data
      this.listSub(data)
    },
    // 处理数据
    listSub (data) {
      for (let index = 0; index <= 4; index++) {
        this.filterList[index] = []
        data.sub.forEach((obj, i) => {
          if (obj.category === index) {
            this.filterList[index].push(obj)
          }
        })
      }
      this.popoverShow = true
    },
    onClickOutside () {
      this.popoverShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.songMenu {
  .BoutiquePlaylist {
    width: 100%;
    height: 151.0008px;
    margin-bottom: 20px;
    background-color: transparent;
    background-image: linear-gradient(
      to right,
      rgb(194, 111, 111),
      rgb(121, 114, 100),
      rgb(61, 61, 31),
      rgb(175, 92, 53),
      rgb(175, 155, 175)
    );
    border-radius: 5px;
    display: flex;
    align-items: center;
    img {
      padding: 15px;
      height: 100%;
      border-radius: 5px;
    }
    div {
      .el-button {
        width: 100px;
        height: 30px;
        background-color: transparent;
        padding: 0;
        color: @navBar;
        font-size: 14px;
        margin-bottom: 10px;
        border: #e7aa5a 1px solid;
        color: #e7aa5a;
        .icon-jingpin {
          color: #e7aa5a;
        }
      }
      h2 {
        margin-top: 10px;
        color: #fff;
      }
    }
  }

  .songMenuNavBar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .el-button {
      width: 100px;
      height: 30px;
      background-color: transparent;
      padding: 0;
      color: @navBar;
      border: 1px @btnBorder solid;
      font-size: 14px;
    }
    .el-tabs {
      width: 600px;
      /*去掉tabs底部的下划线*/
      /deep/.el-tabs__nav-wrap::after {
        position: static !important;
      }
      /deep/.el-tabs__nav {
        color: @fontsize;
        /*去掉切换时el-tab-pane底部的蓝色下划线*/
        .el-tabs__active-bar {
          background-color: transparent !important;
        }

        .el-tabs__item {
          padding: 0;
          color: @fontsize;
        }
        .is-active {
          color: red;
        }
      }
    }
  }
  /deep/.el-pagination.is-background .el-pager li {
    background-color: transparent !important;
    border: 1px #878787 solid;
    color: rgb(32, 112, 112);
  }
  /deep/.el-pagination button:disabled {
    background-color: #393939;
  }
  /deep/.el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev {
    background-color: #393939;
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #fff;
  }
  .elpopover {
    position: absolute;
    top: 30%;
    left: 0%;
    z-index: 120;
    padding: 0 !important;
  }
}
</style>
