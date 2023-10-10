<template>
  <div class="songlist-content" >
    <el-card class="box-card">
      <el-row type="flex">
        <el-image class="el-img" :src="songList.coverImgUrl" fits="cover">
        </el-image>
        <el-row>
          <el-row type="flex" align="middle">
            <el-tag class="item" size="small">歌单</el-tag>
            <h1 class="title">&nbsp;{{ songList.name }}</h1>
          </el-row>
          <el-row class="usermsg">
            <el-avatar
            v-if="songList.creator.avatarUrl"
              class="userimg"
              :size="35"
              fit="cover"
              :src="songList.creator.avatarUrl"
            ></el-avatar>
            <el-link class="username" type="primary" :underline="false">
              &nbsp;{{ songList.creator.nickname }} &nbsp;</el-link
            >
            <span>最近更新 {{ songList.updateTime | monthTime('YYYY年MM月DD日') }}</span>
          </el-row>
          <el-row class="songBtn">
            <el-button round type="danger">
              <!-- 触发子组件的全部播放 -->
              <i class="el-icon-video-play" ref="playAll" @click="$refs.search_single_table.play(singleMsg)"></i> 播放全部 &nbsp;<i
                class="el-icon-plus"
              ></i
            ></el-button>
            <el-button round class="transparent" icon="el-icon-folder-checked"
              >已收藏（{{ songList.subscribedCount | numberFormat }}）</el-button
            >
            <el-button round class="transparent" icon="el-icon-share"
              >分享（{{ songList.shareCount | numberFormat }}）</el-button
            >
            <el-button round class="transparent" icon="el-icon-download"
              >下载全部</el-button
            >
          </el-row>
          <el-row class="songnumber"
            >歌曲：<span>{{ songList.trackCount }}</span> 播放：<span>{{
              songList.playCount | numberFormat
            }}</span></el-row
          >
          <el-row class="introduce"
            >简介：<span>{{ songList.description }}</span></el-row
          >
        </el-row>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-tabs class="el-tab" v-model="activeName">
        <el-tab-pane class="el-tab-pane" label="歌曲列表" name="first">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="text"
            show-word-limit
            suffix-icon="el-icon-search"
          >
          </el-input>
          <!-- 放入组件 -->
          <songList ref="search_single_table" :singleMsg="singleMsg" :listTable="listTable" />
        </el-tab-pane>
        <el-tab-pane class="el-tab-pane" label="配置管理" name="second">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="140"
            show-word-limit
          >
          </el-input>
        </el-tab-pane>
        <el-tab-pane class="el-tab-pane" label="角色管理" name="third"
          >角色管理</el-tab-pane
        >
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import songList from '@/components/songList.vue'
import { mapState } from 'vuex'
export default {
  nama: 'songlistIndex',
  data () {
    return {
      activeName: 'first',
      textarea: '',
      text: '',
      songList: [{}], // 歌单数据
      singleMsg: [{}], // 歌曲信息
      listTable: ['操作', '音乐标题', '歌手', '专辑', '时长', '热度'] // 表格的表头
    }
  },
  components: {
    songList
  },
  created () {
    this.processData()
  },
  computed: {
    ...mapState(['songListMsg'])
  },
  methods: {
    // 处理数据
    processData () {
      // 把路由传过来的值保存到songList中
      this.songList = this.songListMsg
      this.fullscreenLoading = true
      // 判断是不是飙升榜
      if (this.songList && this.songList.ToplistType === 'S') {
        this.listTable = [
          '操作',
          '音乐标题',
          '飙升率',
          '歌手',
          '专辑',
          '时长',
          '热度'
        ] // 表格的表头
        const { trackIds, tracks } = this.songListMsg
        trackIds.forEach((obj, index) => {
          tracks[index].ratio = obj.ratio
        })
        this.singleMsg = tracks
      } else {
        const { tracks } = this.songListMsg
        this.singleMsg = tracks
      }
      this.fullscreenLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.songlist-content {
  padding: 30px 30px;
  width: 100%;
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
  .box-card {
    width: 100%;
    background-color: transparent;
    border: none;
    .el-tab {
      width: 100%;
      background-color: transparent;
    }
    /deep/.el-tabs__item {
      color: @navBar;
      font-size: 18px;
    }
    /deep/.is-active {
      font-size: 22px;
      font-weight: 800;
    }
    /deep/.el-tabs__active-bar {
      height: 5px;
      background-color: @btnred;
    }
    /deep/ .el-tabs__nav-wrap {
      &::after {
        background-color: transparent;
      }
    }
    /deep/ .el-input__inner {
      -webkit-appearance: none;
      border-radius: 4px;
      background-color: #a5a9b3;
      border: none;
      box-sizing: border-box;
      color: #fff;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 30%;
      outline: none;
      border-radius: 25px;
      &::input-placeholder {
        color: #fff;
      }
    }
    /deep/.el-input__prefix,
    .el-input__suffix {
      position: unset;
    }
  }
  .el-img {
    width: 185px;
    height: 185px;
    margin-right: 20px;
  }
  .usermsg {
    .userimg {
      vertical-align: middle;
    }
    // .username {
    //   // vertical-align: middle;
    // }
  }
  .songBtn,
  .usermsg,
  .songnumber,
  .introduce {
    margin-top: 10px;
  }
  .introduce{
    max-width: 500px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .songBtn {
    .transparent {
      background-color: transparent;
      border: 1px solid #d0d0d0;
    }
  }
}
.item {
  background-color: transparent;
  color: red;
  border: 1px solid red;
  // padding: 1px 3px;
}
.title {
  color: #d0d0d0;
}
.el-row {
  color: #d0d0d0;
}
</style>
