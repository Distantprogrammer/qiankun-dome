<template>
  <!-- 侧边栏 -->
  <div class="main_left">
    <ul class="findMusic">
      <li><router-link :to="{ path: '/foundMusic', query: { id: '1' } }">发现音乐</router-link></li>
      <li> <router-link :to="{ path: '/podcast', query: { id: '1' } }">播客</router-link></li>
      <li><router-link :to="{ path: '/video', query: { id: '1' } }">视频</router-link></li>
      <li><router-link :to="{ path: '/attention', query: { id: '1' } }">关注</router-link></li>
      <li><router-link :to="{ path: '/liveStreaming', query: { id: '1' } }">直播</router-link></li>
      <li><router-link :to="{ path: '/privateFM', query: { id: '1' } }">私人FM</router-link></li>
    </ul>
    <ul class="myMusic commonMusic">
      <li>我的音乐</li>
      <li class="iconfont"><i>&#xe659;</i>本地与下载</li>
      <li class="iconfont"><i>&#xe8ad;</i>最近播放</li>
      <li class="iconfont"><i>&#xe60c;</i>我的音乐云盘</li>
      <li class="iconfont"><i>&#xe6b4;</i>我的播客</li>
      <li class="iconfont"><i>&#xe62a;</i>我的收藏</li>
    </ul>
    <ul class="foundMusic commonMusic">
      <li class="iconfont foundMusic_right">
        创建的歌单
        <i>&#xe687;</i>
        <i class="right plus">+</i>
      </li>
      <li class="iconfont foundMusic_right">
        <i>&#xeca1;</i>我喜欢的音乐
        <button class="iconfont right">
          <i>&#xe60d;</i>
        </button>
      </li>
    </ul>
    <ul class="collectMusic commonMusic">
      <li class="iconfont">收藏的歌单 <i>&#xe687;</i></li>
      <li class="iconfont"><i>&#xe659;</i>本地与下载</li>
      <li class="iconfont"><i>&#xe8ad;</i>最近播放</li>
      <li class="iconfont"><i>&#xe60c;</i>我的音乐云盘</li>
      <li class="iconfont"><i>&#xe6b4;</i>我的播客</li>
      <li class="iconfont lastLi"><i>&#xe62a;</i>我的收藏</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideBarIndex'
}
</script>

<style lang="less" scoped>
.main_left {
  cursor: pointer;
  height: 100%;
  // width: 10.107rem;
  min-width: 200px;
  max-width: 355px;
  flex: 1;
  padding-left: 0.911rem;
  overflow-y: scroll;
  border-right: 0.036rem solid #4c4949;
  background-color: @hedfot;

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
    background: #9b8f8f;
  }

  // &::-webkit-scrollbar-track {
  //   /*滚动条里面轨道*/
  //   box-shadow: inset 0 0 5px rgba(168, 81, 81, 0.2);
  //   height: 5px;
  //   border-radius: 10px;
  //   background: #4bbe5d;
  // }
  li {
    color: #fff;
    margin-top: 0.911rem;
    padding: 0.182rem 0rem 0.182rem 0.182rem;
    border-radius: 0.112rem;
    font-size: 0.729rem;

    a {
      color: #fff;
    }
  }

  .commonMusic {
    .right {
      font-size: 0.801rem;
      padding: 0 0;
    }

    li {
      i {
        padding-right: 0.255rem;
      }

      &:not(&:first-child) {
        &:hover {
          background-color: #333333;
        }
      }

      &:first-child {
        color: #9f9f9f;
        font-size: 0.583rem;
      }
    }
  }

  .findMusic {
    li {
      padding: 0.182rem 0rem 0.182rem 0.182rem;

      &:hover {
        background-color: #333333;
      }
    }
  }

  .foundMusic {
    .foundMusic_right {
      display: flex;
      align-items: center;

      .plus {
        margin-left: auto;
        margin-right: 0.382rem;
      }
    }

    button {
      text-align: center;
      margin-left: auto;
      margin-right: 0.482rem;
      width: 1.575rem;
      height: 0.911rem;
      border: 1px solid #444444;
      border-radius: 0.364rem;
      background-color: transparent;
      color: #fff;

      // background-color: #e1c3c3;
      i {
        padding: 0 0;
      }
    }
  }

  .collectMusic {
    .lastLi {
      padding-bottom: 0.729rem;
    }
  }
}
</style>
