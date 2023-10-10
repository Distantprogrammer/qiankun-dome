<template>
  <div class="popover">
    <div class="el-popover__title">全部歌单</div>
    <div
      class="categories clearfix"
      v-for="(item, index) in categories"
      :key="index"
    >
      <div class="categories_txt clearfix">
        <span><i
          class="iconfont"
          :class="[
            index == 0
              ? 'icon-wangluo'
              : index == 1
              ? 'icon-yinglangshangwufenggetubiao-13'
              : index == 2
              ? 'icon-kafei'
              : index == 3
              ? 'icon-smiling'
              : index == 4
              ? 'icon-zhuti'
              : ''
          ]"
        ></i>
        {{ item }}</span>
      </div>
      <div class="categories_btn clearfix">
        <div
          class="categories_title clearfix"
          @click="$emit('input', obj.name)"
          :class="{ is_active: value === obj.name }"
          v-for="obj in filterList[index]"
          :key="obj.id"
        >
          {{ obj.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songListPopover',
  props: {
    filterList: {
      type: [Array, Object]
    },
    categories: {
      type: [Object, Array]
    },
    value: {
      default: '华语'
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.popover {
  margin-top: 25px;
  width: 745px;
  background-color: #363636 !important;
  min-width: 150px;
  border-radius: 4px;
  color: #606266;
  line-height: 1.4;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  word-break: break-all;
  .el-popover__title {
    font-size: 16px;
    text-align: left;
    line-height: 1;
    color: #d0d0d0 !important;
    padding: 30px;
    margin: 0 !important;
    border-bottom: 1px #878787 solid;
  }
  .categories {
    display: flex;
    padding: 20px;
    .categories_txt {
      padding: 10px 0;
      width: 110px;
      color: #747983;
      font-size: 14px;
      text-align: left;
      i {
        vertical-align: middle;
        padding-right: 5px;
        font-size: 22px;
        color: #d0d0d0;
      }
    }
    .categories_btn {
      width: 100%;
      .categories_title {
        padding: 10px 0;
        float: left;
        // text-align: center;
        color: @navBar;
        width: 100px;
      }
      .is_active {
        color: red;
      }
    }
  }
}
</style>
