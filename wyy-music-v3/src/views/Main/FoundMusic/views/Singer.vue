<template>
  <div
    class="Singer"
  >
    <div
      class="singerNavBar clearfix"
      v-for="(item, index) in singerType"
      :key="index"
    >
      <div class="singerNavBar_main clearfix">
        <h5>{{ item }} :</h5>
      </div>
      <div class="singerNavBar_title clearfix">
        <p
          :class="{ is_active: value[index] == str }"
          v-for="(str, i) in singerArtist[index]"
          :key="i"
          @click="getartistList(index, str)"
        >
          {{ str }}
        </p>
      </div>
    </div>
    <singerBox v-if="singerList" :singerList="singerList" @nextPage='nextPage' :loading='loading'/>
  </div>
</template>

<script>
import { artistListAPI } from '@/api'
import singerBox from '@/components/singerBox'
export default {
  name: 'Singer',
  components: {
    singerBox
  },
  data () {
    return {
      // 歌手分类
      singerType: ['语种', '分类', '筛选'],
      singerArtist: [
        ['全部', '华语', '欧美', '日本', '韩国', '其他'],
        ['全部', '男歌手', '女歌手', '乐队组合'],
        [
          // '热门',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
          '#'
        ]
      ],
      value: ['全部', '全部', 'A'],
      area: {
        '-1': '全部',
        7: '华语',
        96: '欧美',
        8: '日本',
        16: '韩国',
        0: '其他'
      },
      type: {
        '-1': '全部',
        1: '男歌手',
        2: '女歌手',
        3: '乐队组合'
      },
      offset: 1, // 分页
      singerList: JSON.parse(window.sessionStorage.getItem('singerList')),
      loading: false
    }
  },
  created () {
    this.getartistList()
  },

  watch: {},
  methods: {
    async getartistList (index, str) {
      this.$set(this.value, index, str)
      this.loading = true
      const obj = { area: '', type: '', initial: '' }
      obj.area = Object.keys(this.area).find(
        (key) => this.area[key] === this.value[0]
      )
      obj.type = Object.keys(this.type).find(
        (key) => this.type[key] === this.value[1]
      )
      obj.initial = this.value[2]
      if (this.singerList && !this.singerList.more) return // 是否有更多数据
      try {
        const { data } = await artistListAPI({
          limit: 30,
          offset: this.offset,
          ...obj
        })
        // this.offset++
        // this.singerList = data
        console.log(data
        )
        if (this.singerList && this.singerList.artists) {
          // this.singerList.artists.push(await data.artists)
          this.singerList.artists = [...this.singerList.artists, ...data.artists]
          window.sessionStorage.setItem('singerList', JSON.stringify(this.singerList))
        } else {
          this.singerList = data
          window.sessionStorage.setItem('singerList', JSON.stringify(data))
        }
        console.log(this.singerList)

        this.loading = false
      } catch (error) {
        this.$message.error('获取歌手列表失败')
        this.loading = false
      }
    },
    nextPage () {
      console.log(111)
      this.offset++
      this.getartistList()
    }
  }
}
</script>

<style lang="less" scoped>
.Singer {
  // height: 100%;
  .load {
    color: #fff;
    text-align: center;
  }
  .singerNavBar {
    display: flex;
    min-width: 1100px;
    width: 100%;
    padding: 0 20px;
    .singerNavBar_main {
      padding: 10px 0;
      h5 {
        width: 50px;
        color: #ced3dd;
        font-size: 14px;
      }
      // text-align: left;
    }
    .singerNavBar_title {
      padding: 0 0 10px 0;
      display: flex;
      flex-wrap: wrap;
      p {
        padding: 10px 0;
        color: @fontsize;
        width: 50px;
        text-align: center;
      }
    }
    .is_active {
      color: red !important;
    }
  }
}
</style>
