<template>
  <div class="portion_title" v-if="officialTracks">
          <ul>
            <!-- 这里使用了双重for循环 -->
            <li class="clearfix"  v-for="(obj,index) in (officialTracks.trackIds.slice(0,5))" :key="obj.id" @dblclick="playFn(obj.id)">
               <div class="portion_titlt_box">
                <span class="if_bigthree">{{ index+1}}</span>
                <span class="else_smthree" v-if="officialTracks.ToplistType==='S'">{{ officialTracks.trackIds[index].ratio}}%</span>
                <span class="else_smthree" style="color:red; font-size: 5px;" v-if="officialTracks.ToplistType==='O'">NEW</span>
                <span class="else_smthree" v-if="officialTracks.ToplistType==='N'">-</span>
                <span class="else_smthree" v-if="officialTracks.ToplistType==='H'">-</span>
                <span style="color: #ddd"
                  >{{officialTracks.tracks[index].name}} &nbsp;<span v-if="officialTracks.tracks[index].alia[0]" class="else_smthree"
                    >({{ officialTracks.tracks[index].alia[0] }})</span
                  >
                </span>
                <span class="title_rigth">{{officialTracks.tracks[index].ar[0].name}}</span>
              </div>
            </li>
            <li @click="$parent.paramsFn(officialTracks)">
              查看全部
              <i class="iconfont icon-arrow-right-bold arrow_right"></i>
            </li>
          </ul>
        </div>
</template>

<script>
import playFn from '@/utils/play'
export default {
  props: {
    officialTracks: {
      required: true
    }
  },
  methods: {
    playFn (data) {
      // console.log(this.officialTracks)
      // console.log(this.officiaTracks.trackIds[0].id)
      playFn(data)
    }
  }
}
</script>

<style lang="less" scoped>
//内容
  .portion_title {
    flex: 1;
    ul {
      margin-left: 30px;
      li {
        height: 35px;
        line-height: 35px;
        border-radius: 2px;
        // color: #000;
        font-weight: 600;
        &:last-child{
          color: #fff;
        }
        &:nth-child(2n-1) {
          background-color: #2f2f2f;
        }
        &:hover {
          background-color: #333;
        }
        .portion_titlt_box {
          padding: 0 14px;
          // 大于三的显示的颜色
          .if_bigthree {
            color: red;
          }
          .else_smthree {
            color: #7a7e80;
          }
          // 小于三显示的颜色
          & > span {
            padding: 0 8px;
          }
          .title_rigth {
            color: @fontsize;
            float: right;
          }
        }
      }
    }
  }
</style>
