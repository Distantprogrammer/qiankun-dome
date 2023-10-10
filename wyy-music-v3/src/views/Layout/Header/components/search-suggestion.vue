<template>
  <div class="search-suggestion">
    <!-- 猜你想搜 -->
    <div class="guess">
      <van-cell icon="search">
        <span slot="title" class="fff">猜你想搜</span>
      </van-cell>
      <div class="search_result">
        <router-link :to="{ path: '/search', query:{value:searchValue} }">
        <van-cell
          :title="obj.name"
          v-for="(obj, index) in supposeSearch"
          :key="index"
        />
        </router-link>
      </div>
    </div>
    <!-- 单曲 -->
    <div class="single" v-if="order.includes('playlists')">
      <van-cell icon="search">
        <span slot="title" class="fff">单曲</span>
      </van-cell>
      <div class="search_result">
        <van-cell v-for="obj in oneSearchList" :key="obj.id">
          <span slot="title"
            >{{ obj.name }}&nbsp;
            <span class="alias" v-if="obj.alias[0]">{{ obj.alias[0] }}</span
            >&nbsp;
            <span>{{ obj.artists[0].name }}</span>
          </span>
        </van-cell>
      </div>
    </div>
    <!-- 歌手 -->
    <div class="singer" v-if="order.includes('artists')">
      <van-cell icon="search">
        <span slot="title" class="fff">歌手</span>
      </van-cell>
      <div class="search_result">
        <van-cell
          :title="obj.name"
          v-for="obj in singesSearchList"
          :key="obj.id"
        />
      </div>
    </div>
    <!-- 专辑 -->
    <div class="album" v-if="order.includes('albums')">
      <van-cell icon="search">
        <span slot="title" class="fff">专辑</span>
      </van-cell>
      <div class="search_result">
        <van-cell v-for="obj in albumSearchList" :key="obj.id">
          <span slot="title"
            >{{ obj.name }}&nbsp;
            <span>{{ obj.artist.name }}</span>
          </span>
        </van-cell>
      </div>
    </div>
    <!-- 歌单 -->
    <div class="song_list" v-if="order.includes('playlists')">
      <van-cell icon="search">
        <span slot="title" class="fff">歌单</span>
      </van-cell>
      <div class="search_result">
        <van-cell :title="obj.name" v-for="obj in searchSongList" :key="obj.id">
          <span slot="title">
            {{ obj.name }}
          </span>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { SuggestSearchAPI, CloudSearchAPI } from '@/api'
export default {
  name: 'searchSuggestion',
  props: {
    searchValue: {
      type: [String, Number]
    }
  },
  data () {
    return {
      supposeSearch: [], // 猜你想搜
      // suggestSearch: [], // 搜索建议
      oneSearchList: [], // 单曲
      albumSearchList: [], // 专辑
      singesSearchList: [], // 歌手
      searchSongList: [], // 歌单
      order: [], // 搜到的数据
      time: null
      // searchType: [1, 10, 100, 1000] // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单
    }
  },
  watch: {
    searchValue: {
      handler: debounce(function () {
        this.onsearch()
      }, 300),
      immediate: true // 立即侦听
    }
  },
  methods: {
    async onsearch () {
      try {
        const {
          data: { result }
        } = await SuggestSearchAPI({
          keywords: this.searchValue
        })
        const res = await CloudSearchAPI({
          keywords: this.searchValue,
          limit: 12
        })
        this.supposeSearch = res.data.result.songs
        this.order = result.order
        // 有 songs ？
        const ifsongs = {}.propertyIsEnumerable.call(result, 'songs')
        if (ifsongs) {
          this.oneSearchList = result.songs
        }
        // 有 artists ？  // 歌手
        const ifartists = {}.propertyIsEnumerable.call(result, 'artists')
        if (ifartists) {
          this.singesSearchList = result.artists
        }
        // 有 albums ？
        const ifalbums = {}.propertyIsEnumerable.call(result, 'albums')
        if (ifalbums) {
          this.albumSearchList = result.albums
        }
        // 有 playlists ？ // 歌单
        const ifplaylists = {}.propertyIsEnumerable.call(result, 'playlists')
        if (ifplaylists) {
          this.searchSongList = result.playlists
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="less">
.search_result {
  padding: 0 16px;
  white-space: nowrap;
  color: #fff !important;
  .van-cell__title {
    padding: 5px 0;
    font-size: 12px;
    color: rgb(224, 197, 197) !important;
  }
}
 /deep/.van-cell {
     color: #fff !important;
  }
  .alias{
    color: @fontsize;
  }
  .fff{
    color: #fff !important;
  }
</style>
