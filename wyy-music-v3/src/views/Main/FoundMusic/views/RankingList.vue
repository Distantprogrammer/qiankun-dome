<template>
  <div class="rankingList" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 官方榜 -->
    <div class="official_list" v-if=" official_list && officialTracks" >
      <h3 class="public_title">
        官方榜
        <!-- <i class="iconfont icon-arrow-right-bold arrow_right"></i> -->
      </h3>
      <!-- portion 部分  显示部分数据-->
      <div
        class="portion_list"
        v-for="(obj, index) in official_list"
        :key="index"
      >
        <div class="portion_img" >
          <Playbtn class="playBtn" @click.native="playFn(officialTracks[index].trackIds)"/>
          <span class="updateTime"
            >{{ obj.updateTime | monthTime('MM月DD日') }}更新</span
          >
          <img :src="obj.coverImgUrl" alt="" @click="paramsFn(officialTracks[index])" />
        </div>
           <portionTitle :officialTracks='officialTracks[index]'/>
      </div>
      <!-- for循环 -->
      <div class="new_list"></div>
      <div class="original_list"></div>
      <div class="host_list"></div>
    </div>
    <!-- 全球榜 -->
    <div class="global_list" v-if="global_list">
      <h3 class="public_title">
        全球榜
        <!-- <i class="iconfont icon-arrow-right-bold arrow_right"></i> -->
      </h3>
      <div class="global_box">
        <ul>
          <li v-for="obj in global_list" :key="obj.id">
            <div class="global_img"  >
              <Playbtn class="playBtn" @click.native="globalPlay(obj.id)"/>
              <img :src="obj.coverImgUrl" alt="" @click="paramsFn(obj.id)"/>
            </div>
            <p class="global_text">{{ obj.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import portionTitle from '../components/portion-title.vue'
import { RankingListAPI, SongListDetailsAPI, playlistTrackAPI } from '@/api'
import Playbtn from '@/components/playBtn.vue'
import playFn from '@/utils/play'
// import { getItem } from '@/utils/storage'
export default {
  name: 'RankingList',
  data () {
    return {
      fullscreenLoading: false,
      official_list: [], // 官方
      global_list: [], // 全球
      // soaringTracks: { trackIds: [] }, // 飙升榜
      // newSongTracks: { trackIds: [] }, // 新歌榜
      // originalTracks: { trackIds: [] }, // 原创
      // hostSongTracks: { trackIds: [] }, // 热歌榜
      officialTracks: this.$store.state.officialMusicListMsg
    }
  },
  created () {
    this.getRankingList() // 排行榜
  },
  methods: {
    // 排行榜
    async getRankingList () {
      const {
        data: { list }
      } = await RankingListAPI()
      // 官方排行榜
      this.official_list = list.slice(0, 4) // 截取数组
      // 全球排行榜
      this.global_list = list.slice(4)
      if (!window.sessionStorage.getItem('officialMUSICLISTMSG')) {
        this.getSongListDetails()
      }
    },
    // 排行榜详情
    async getSongListDetails () {
      this.fullscreenLoading = true
      // 循环请求排行榜数据
      // 清除this.officialTracks已有的数据
      this.officialTracks = []
      for (let i = 0; i < this.official_list.length; i++) {
        const res = await SongListDetailsAPI({
          id: this.official_list[i].id
        })
        const { data: { playlist } } = res
        this.officialTracks.push(await playlist)
        this.$store.commit('setofficialMusicListMsg', this.officialTracks)
        this.fullscreenLoading = false
      }
    },
    // 进入歌单详情页面数据处理
    async paramsFn (data) {
      // 判断数据是不是全球榜单的 及传过来的数据为id
      if (Object.prototype.toString.call(data) === '[object Number]') {
        this.fullscreenLoading = true
        const res = await SongListDetailsAPI({
          id: data
        })
        const { data: { songs } } = await playlistTrackAPI({
          id: data,
          // limit: 5,
          offset: 0
        })
        const { data: { playlist } } = res
        playlist.tracks = songs
        this.$store.commit('setsongListMsg', playlist)
        this.fullscreenLoading = false
      } else {
        this.$store.commit('setsongListMsg', data)
      }
      // 数据传入vuex
      this.$router.push({ name: 'songListDeta' })
    },
    playFn (data) {
      console.log(data)
      playFn(data)
    },
    // 全球榜播放
    async globalPlay (id) {
      const { data: { playlist: { trackIds } } } = await SongListDetailsAPI({
        id
      })
      playFn(trackIds)
    }

  },
  components: {
    Playbtn,
    portionTitle
  }
}
</script>

<style lang="less" scoped>
.arrow_right {
  font-size: 12px;
  font-weight: normal;
}
.global_box,
.portion_list {
  margin-top: 20px;
}
.public_title {
  font-size: 1rem;
  font-weight: 800;
  color: #d0d0d0;
}
// 官方
.official_list {
  // 图片
  .portion_list {
    display: flex;
    margin-bottom: 28px;
    .portion_img {
      overflow: hidden;
      position: relative;
      width: 172px;
      height: 172px;
      max-width: 172px;
      max-height: 172px;
      background-color: #fff;
      border-radius: 4px;
      .playBtn {
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        transform: translate(-50%, -50%);
        transition: all 0.3s;
      }
      &:hover .playBtn {
        opacity: 0.9;
      }
      .updateTime {
        position: absolute;
        top: 67%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

}
// 全球
.global_list {
  .global_box {
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        flex: 16.6666%;
        margin: 0 0.4167rem 0.4167rem 0;
        font-size: .4167rem;
        .global_img {
          position: relative;
          max-width: 210px;
          max-height: 210px;
          min-width: 140px;
          min-height: 140px;
          width: 8.75rem;
          height: 8.75rem;
          border-radius: 0.2083rem;
          overflow: hidden;
          .playBtn {
            opacity: 0;
            position: absolute;
            bottom: 6%;
            right: 6%;
            width: 1.25rem;
            height: 1.25rem;
            transition: all 0.3s;
          }
          &:hover .playBtn {
            opacity: 0.9;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .global_text {
          max-width: 210px;
          width: 8.75rem;
          padding-top: 0.2917rem;
          font-size: 14px;
          color: #d0d0d0;
        }
      }
    }
  }
}
</style>
