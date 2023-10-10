<template>
  <!-- 个人推荐 -->
  <div class="userRecommend">
    <!-- 轮播图 -->
    <div class="main_slideshow">
      <el-carousel :interval="4000" type="card" height="200px" id="el" loop>
        <el-carousel-item v-for="item in bannerList" :key="item.imageUrl">
          <a class="img_a" @click="playFn(item.targetId)">
            <el-image class="slideshow_img" :src="item.imageUrl" alt="">
            </el-image>
            <em>{{ item.typeTitle }}</em>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 歌单 -->
    <div class="main_song_list">
      <!-- 推荐 -->
      <div class="recommend">
        <h3 class="playlist_title">
          推荐歌单 <i class="iconfont icon-arrow-right-bold arrow_right"></i>
        </h3>
        <div class="recommend_table">
          <ul>
            <!-- 上5 -->
            <li v-for="item in SongList" :key="item.id">
              <div class="daily_push">
                 <div class="view_counts"><i class="iconfont icon-24gl-play"></i> {{ item.playCount | numberFormat }}</div>
                <playBtn class="playBtn"  @click.native="listPlay(item.id)"/>
                <img :src="item.picUrl" @click="songList(item.id)"/>
                <!-- <img :src="item.picUrl" alt="" /> -->
              </div>
              <p class="playlist_introduced">{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 无接口改为最新音乐 -->
      <!-- 播客 -->
      <div class="recommend">
        <h3 class="playlist_title">
          最新音乐
          <i class="iconfont icon-arrow-right-bold arrow_right"></i>
        </h3>
        <div class="podcast_table">
          <ul>
            <li v-for="obj in newSongLIst" :key="obj.id">
              <!-- 把点击的歌曲信息传过去 -->
              <div
                class="podcast_img position_relative"
                @click="playFn(obj.id)"
              >
                <Playbtn class="play"></Playbtn>
                <img :src="obj.picUrl" alt="" />
              </div>
              <!-- 文字 -->
              <div class="song_msg">
                <h4 class="song_name">{{ obj.name }}</h4>
                <p class="song_type">
                  <span>{{ obj.song.album.subType }}</span>
                </p>
                <div class="song_else">
                  <span class="song_author">
                    {{ obj.song.artists[0].name }}
                  </span>
                  <span class="song_host">
                    <i class="iconfont">&#xe7c5;</i>
                    <span>52万</span>
                  </span>
                  <span class="song_time">
                    <i class="iconfont time">&#xe601;</i>
                    {{ obj.song.hMusic.playTime | secondeTime }}
                  </span>
                </div>
              </div>
            </li>
            <!-- 接口循环 -->
          </ul>
        </div>
      </div>
      <!-- 独家放送 -->
      <div class="recommend">
        <h3 class="playlist_title">
          独家放送
          <i class="iconfont icon-arrow-right-bold arrow_right"></i>
        </h3>
        <div class="exclusive_table">
          <div
            class="exclusive_box"
            v-for="item in exclusiveList"
            :key="item.id"
          >
            <div class="exclusive_img">
              <img :src="item.sPicUrl" alt="" />
            </div>
            <p class="exclusive_title">
              <a href="javascript:;">{{ item.copywriter }}</a>
            </p>
          </div>
        </div>
      </div>
      <!-- 推荐mv -->
      <div class="recommend">
        <h3 class="playlist_title">
          推荐MV
          <i class="iconfont icon-arrow-right-bold arrow_right"></i>
        </h3>
        <div class="mv_table">
          <div class="mv_box" v-for="item in mvList" :key="item.id">
            <div class="mv_img">
              <img :src="item.picUrl" alt="" />
            </div>
            <div class="mv_msg">
              <p class="mv_title">
                <a href="javascript:;">{{ item.name }}</a>
              </p>
              <p class="mv_name">
                <a
                  href="javascript:;"
                  v-for="(arr, index) in item.artists"
                  :key="arr.id"
                  >{{ arr.name
                  }}<b v-if="item.artists.length - 1 !== index"> / </b></a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 调整顺序 -->
      <div class="recommend">
        <div class="layout_order">
          <p class="layout_hint">
            现在可以根据个人喜好， 自由调整首页栏目顺序啦~
          </p>
          <button class="layout_btn">调整栏目顺序</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songList from '@/utils/songList'
import {
  HomeBannerAPI,
  RecommendThePlayListAPI,
  RecommendNewMusicAPI,
  ExclusiveAndPoredOverAPI,
  RecommendedMVAPI,
  SongListDetailsAPI
} from '@/api/index'

import playFn from '@/utils/play'
import Playbtn from '@/components/playBtn.vue'
// import { mapMutations } from 'vuex'
export default {
  name: 'MainIndex',
  data () {
    return {
      bannerList: [], // 轮播图
      SongList: [], // 推荐歌单数据
      newSongLIst: [], // 最新音乐
      exclusiveList: [], // 独家放送
      mvList: [] // 推荐mv
    }
  },
  components: {
    Playbtn
  },
  created () {
    this.BannerImg() // 轮播图
    this.recommendSong() // 推荐歌单
    this.NewMusic() // 最新音乐
    this.Exclusive() // 独家放送
    this.RecommendedMV() // 推荐mv
  },
  // 检查本地存储是否有，没有自动发起接口
  methods: {
    // 轮播图
    async BannerImg () {
      try {
        const { data } = await HomeBannerAPI({
          type: 0
        })
        // console.log(data)
        this.bannerList = data.banners
      } catch (error) {
        console.log(error)
      }
    },
    // 推荐歌单
    async recommendSong () {
      try {
        const { data } = await RecommendThePlayListAPI({
          limit: 10
        })
        this.SongList = data.result
      } catch (error) {
        console.log(error)
      }
    },
    // 最新音乐
    async NewMusic () {
      try {
        const { data } = await RecommendNewMusicAPI({
          limit: 6
        })
        this.newSongLIst = data.result
      } catch (error) {
        console.log('网络出错', error)
      }
    },
    // 独家放送
    async Exclusive () {
      try {
        const { data } = await ExclusiveAndPoredOverAPI()
        this.exclusiveList = data.result
      } catch (error) {
        console.log(error)
      }
    },
    // 推荐mv
    async RecommendedMV () {
      try {
        const { data } = await RecommendedMVAPI()
        this.mvList = data.result
      } catch (error) {
        console.log(error)
      }
    },
    playFn (data) {
      playFn(data)
      // console.log(12, id)
      // this.$store.commit('delIdMusic')
    },
    songList (data) {
      songList(data)
    },
    async listPlay (id) {
      console.log(id)
      const { data: { playlist: { trackIds } } } = await SongListDetailsAPI({
        id
      })
      playFn(trackIds)
    }
  }
}
</script>

<style lang="less" scoped>
.userRecommend {
  //轮播图
  .main_slideshow {
    .el-carousel__item {
      &:nth-child(2n) {
        background-color: #99a9bf;
      }
      &:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        em {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: #cc4a4a;
          padding: 3px 8px;
          border-radius: 5px;
        }

        .slideshow_img {
          width: 100%;
          height: 100%;
        }
        #el {
          .el-carousel__button {
            width: 10px;
            height: 5px;
            border-radius: 50%;
            background-color: #ec4141;
          }
        }
      }
      // height: 200px;
      // background: url() no-repeat;
      // background-size: 100% 100%;
      // &:nth-child(2) {
      //   background: url() no-repeat;
      // }
    }
  }
  // 推荐歌单
  .main_song_list {
    // height: 10000px;
    width: 100%;
    margin: 0 auto;
    //标题
    .playlist_title {
      margin-bottom: 0.625rem;
      font-weight: 800;
      font-size: 1rem;
      color: #fff;
    }
    .recommend {
      color: #d0d0d0; // 测试
      .arrow_right {
        font-size: 0.9167rem;
        color: #d0d0d0;
        font-weight: normal;
      }
      // 推荐歌单内容
      .recommend_table {
        // display: flex;
        // flex-direction: column;
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            flex: 16.6666%;
            // float: left;
            width: 8.3333rem;
            margin: 0 0.4167rem 0.4167rem 0.4167rem;
            &:nth-child(6n),
            &:first-child {
              margin-left: 0;
            }
            &:nth-child(5n),
            &:last-child {
              margin-right: 0;
            }
            // 图片
            .daily_push {
              border-radius: 5px;
              overflow: hidden;
              width: 100%;
              height: 200px;
              position: relative;
              font-size: 11px;
              .view_counts{
                position: absolute;
                top: 0%;
                right: 2%;
                color: #fff;
              }
              .playBtn {
                opacity: 0;
                position: absolute;
                bottom: 0;
                right: 0;
                width:40px;
                height: 40px;
                transform: translate(-50%, -50%);
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

            // 文字
            .playlist_introduced {
              color: #fff;
              padding: 10px;
              font-size: 14px;
            }
          }
        }
      }
    }
    // 最新音乐
    .podcast_table {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          flex: 50%;
          display: flex;
          margin-bottom: 0.6667rem;
          align-items: center;
          &:hover .song_msg {
            border-radius: 0.1667rem;
            background-color: #3c3c3c;
          }
          .podcast_img {
            width: 75px;
            height: 75px;
            border-radius: 0.1667rem;
            overflow: hidden;
            font-size: 0.25rem;
            .play {
              width: 0.8333rem;
              height: 0.8333rem;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          .song_msg {
            padding: 0.2083rem 0 0 0.625rem;
            flex: 1;
            * {
              letter-spacing: 0.5px;
              color: #727272;
              padding-bottom: 2px;
            }
            .song_name {
              color: #fff;
              font-size: 14px;
            }
            .song_type {
              span {
                border: 1px solid #3c3c3c;
              }
            }
            .song_else {
              // display: flex;
              // justify-content: center;
              // align-items: baseline;
              & > span {
                padding-left: 2px;
              }
              .song_host {
                .time {
                  font-size: 0.5833rem !important;
                }
              }
            }
          }
        }
      }
    }
    // 独家放送
    .exclusive_table {
      width: 100%;
      height: 100%;
      display: flex;
      font-size: 14px;
      // color: #000;
      .exclusive_box {
        &:nth-child(2) {
          margin: 0 20px;
        }
        .exclusive_img {
          width: 355px;
          height: 200px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .exclusive_title {
          padding-top: 10px;
          a {
            color: #d0d0d0;
          }
        }
      }
    }
    // 调整栏目顺序
    .layout_order {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.25rem;
      .layout_hint {
        color: #4b4b4b;
        font-size: 14px;
        margin-bottom: 0.4167rem;
      }
      .layout_btn {
        width: 125px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 14px;
        border-radius: 2px;
        color: #d0d0d0;
        background-color: transparent;
        border: 1px solid #4b4b4b;
      }
    }
    // 推荐mv
    .mv_table {
      width: 100%;
      height: 100%;
      display: flex;
      font-size: 14px;
      // color: #000;
      .mv_box {
        flex: 25%;
        &:nth-child(n) {
          margin-right: 0.625rem;
        }
        &:nth-child(4) {
          margin-right: 0;
        }
        .mv_img {
          // width: 260px;
          height: 150px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .mv_msg {
          .mv_title {
            padding-top: 10px;
            a {
              font-size: 14px;
              color: #d0d0d0;
            }
          }
          .mv_name {
            // padding-top: 10px;
            b {
              color: #7c5d5d;
            }
            a {
              font-size: 14px;
              color: #7c5d5d;
            }
          }
        }
      }
    }
  }
}
.position_relative {
  position: relative;
}
.play {
  position: absolute;
  bottom: 4px;
  right: 4px;
}
</style>
