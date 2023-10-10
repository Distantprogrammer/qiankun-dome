<template>
  <div class="search_may">
    <div class="search_may_img">
      <img
        src="~@/images/logo.jpg"
        class="img_song"
      />
      <!-- :class="[{ img_song: song }, { img_album: album }, { img_mv: mv }]" -->
    </div>
    <div class="search_may_msg">
      <p>
        <span class="search_may_msg_title" v-if="ifShow.title">歌手<!-- {{ title }} --></span>
        <span class="search_may_msg_name" v-if="ifShow.name">林觉姐<!-- {{ name }} -->
        <em v-if="ifShow.remark">
          (这是什么歌<!-- {{ remark }}-->)
        </em></span>
      </p>
      <p v-if="ifShow.introduce" class="search_may_msg_introduce"><!-- {{ introduce }} -->fnegshidasd1</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ifShow: {
        song: true,
        album: true,
        mv: true,
        title: true,
        name: true,
        remark: true,
        introduce: true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search_may {
  width: 18.5rem;
  height: 2.9167rem;
  background-color: #b48888; // #333
  display: flex;
  align-items: center;
  padding-left: .625rem;
  .search_may_img {
    width: 1.7917rem;
    img {
      width: 100%;
      // height: 100%;
    }
  }
  .search_may_msg {
    padding-left: .4167rem ;
    p {
      .search_may_msg_title {
        // vertical-align: middle;
        color: #d2d2d2;
        font-size: .5833rem;
      }
      .search_may_msg_name {
        vertical-align: top;
        font-size: .5833rem;
        margin-left: .2083rem;
        em {
          font-size: .5833rem;
          color: #ddddcf;
        }
      }
    }
    .search_may_msg_introduce {
      font-size: .5rem;
      color: #6c6c66;
    }
  }
}
.img_song {
  border-radius: 50%;
}
.img_album {
  border-radius: 0.125rem;
}
.img_mv {
  border-radius: 0.125rem;
}
</style>
