<template>
  <div class="search-history">
    <van-cell v-if="searchHistories">
      <div slot="title" class="history_search_title">
        搜索历史 &nbsp;&nbsp;
        <van-icon name="delete-o" class="dalete_all" @click="removeHistoryFn" />
      </div>
      <div class="look_all">查看全部</div>
    </van-cell>
    <!-- 历史记录 -->
    <div class="history_list">
      <span v-for="(item, index) in searchHistories" :key="index"
        ><em @click="$emit('inputSearch', item)">{{ item }} </em>
        <van-icon name="cross" class="icon_isshow" @click="removeItemFn(index)"
      /></span>
    </div>
    <!-- 热搜榜 -->
    <div class="host_search">
      <h3 class="host_search_title">热搜榜</h3>
      <div class="host_search_list">
        <ul>
          <li
            v-for="(obj, index) in DetailSearch"
            :key="index"
          >
          <router-link :to="{ path: '/search', query:{value:obj.searchWord} }">
           <!-- 排序 -->
            <div class="host_search_number">
              <span> {{ index + 1 }} </span>
            </div>
            <!-- 信息 -->
            <div class="host_search_msg">
              <div>
                <span class="host_search_name">
                  {{ obj.searchWord }}
                  <span><img :src="obj.iconUrl" alt="" /></span>
                </span>
                <span class="host_search_quantity"> {{ obj.score }} </span>
              </div>
              <p class="introduce">{{ obj.content }}</p>
            </div></router-link>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { setItem, getItem, reomveItem } from '@/utils/storage'
import { DetailSearchAPI } from '@/api'
export default {
  name: 'searchHistory',
  // props: {
  //   searchHistories: {
  //     type: Array
  //   }
  // },
  data () {
    return {
      DetailSearch: [], // 热搜列表
      searchHistories: []
    }
  },
  created () {
    this.getDetailSearch() // 热搜列表
    this.searchHistories = getItem('searchHistories') || [] // 获取本地储存的历史记录
  },
  watch: {
    searchHistories: {
      handler () {
        // 监听有无数据
        if (this.searchHistories && this.searchHistories.length <= 0) {
          this.searchHistories = false
        }
      },
      immediate: true // 立即侦听
    }
  },
  methods: {
    // 热搜列表
    async getDetailSearch () {
      const {
        data: { data }
      } = await DetailSearchAPI()
      this.DetailSearch = data
    },
    // 删除所有
    removeHistoryFn () {
      this.searchHistories = false
      reomveItem('searchHistories')
    },
    // 删除当前
    removeItemFn (index) {
      this.searchHistories.splice(index, 1)
      setItem('searchHistories', this.searchHistories)
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  .history_list {
    display: flex;
    flex-wrap: wrap;
    padding: 0.4167rem 0;
    span {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 0.4167rem 0.4167rem 0;
      display: block;
      border: 1px solid #ccc;
      padding: 0.2083rem 0.625rem;
      border-radius: 0.8333rem;
      font-size: 0.6667rem;
      .icon_isshow {
        opacity: 0;
        transition: all 0.3s;
        color: #ccc;
      }
      &:hover .icon_isshow {
        opacity: 1;
      }
    }
  }
  // 标题
  .history_search_title,
  .host_search_title,
  .dalete_all,
  .look_all {
    color: rgb(175, 141, 141);
  }
  .host_search {
    // 数据
    .host_search_list {
      ul {
        margin-top: 0.8333rem;
        li {
          padding: 0.4167rem 0;
          a{
             display: flex;
            align-items: center;
          }
          &:nth-child(-n + 3) {
            .host_search_number {
              span {
                color: red;
              }
            }
          }
          .host_search_number {
            span {
              font-size: 0.6667rem;
              color: rgb(175, 141, 141);
            }
          }
          .host_search_msg {
            display: flex;
            flex-direction: column;
            margin-left: 1rem;
            div {
              color: #d6d6d6;
              .host_search_name {
                font-size: 0.6667rem;
                span {
                  font-size: 0.5833rem;
                  // display: block;
                  color: red;
                  margin-left: 0.4167rem;
                  img {
                    // width: 14px;s
                    height: 0.6667rem;
                  }
                }
              }
              .host_search_quantity {
                color: #69696b;
                margin-left: 0.4167rem;
              }
            }
            .introduce {
              max-width: 200px;
              /* 强制不换行 */
              white-space: nowrap;
              /* 文字用省略号代替超出的部分 */
              text-overflow: ellipsis;
              /* 匀速溢出内容，隐藏 */
              overflow: hidden;
              color: #69696b;
            }
          }
        }
      }
    }
  }
}
</style>
