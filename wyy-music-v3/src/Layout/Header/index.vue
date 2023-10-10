<script setup>
import { ref } from 'vue';
import { useStore } from '@/store/index'
import {
  CaretBottom,
  Setting,
  BrushFilled,
  ShoppingCart,
} from '@element-plus/icons'
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const theme_items = [
  { label: '主题配置', icon: BrushFilled },
  { label: '随机换肤', icon: Setting },
  { label: '购买源码', icon: ShoppingCart },
]
const store  = useStore()
</script>

<template>
  <div class="header">
    <div class="header_left">
      <div class="header_logo">
        <h1>
          <span class="logo_img"></span>
          <span class="logo_title">五个字测试</span>
        </h1>
      </div>
      <div class="header_search">
        aaa
      </div>
    </div>
    <div class="header_right">
      <div class="user_info">
        <el-avatar :size="28" :src="circleUrl"></el-avatar>
        <div class="user_name">-远方的远</div>
        <div class="user_rights">
          <div class="user_vip"></div>
          <div class="user_msg">
            <el-icon :size="18">
              <CaretBottom />
            </el-icon>
          </div>
        </div>
        <el-icon v-for="(item, index) in theme_items" :key="index" :size="18">
          <component :is="item.icon" />
          <!-- <setting /> -->
        </el-icon>
        <div class="border_line"></div>
      </div>
      <div class="window_tool">
        <el-icon :size="18">
          <CaretBottom />
        </el-icon>
        <el-icon v-for="(item, index) in theme_items" :key="index" :size="18">
          <component :is="item.icon" />
          <!-- <setting /> -->
        </el-icon>
      </div>
    </div>
  </div>
</template>



<style lang="less" scoped>
.header {
  width: 100%;
  height: 55px;
  background-color: #232326;
  display: flex;
  justify-content: space-between;

  .header_left,
  .header_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header_left {
    width: 508px;
    padding: 0 20px;

    .header_logo {
      width: 200px;
      height: 100%;
      background-color: #fff;
    }

    .header_search {
      flex: 1;
      height: 100%;
      background-color: #ccc;
    }
  }

  .header_right {
    width: 420px;
    padding-right: 25px;

    .user_info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      background-color: #f23;

      .user_name {}

      .user_rights {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user_vip {
          width: 37px;
          height: 14px;
          border-radius: 10px;
          background-color: #3e3333;
        }

        .user_msg {}
      }

      .border_line {
        width: 1px;
        height: 16px;
        background-color: #27272a;
      }
    }

    .window_tool {
      width: 165px;
      height: 100%;
      background-color: #a31;
      padding-left: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
