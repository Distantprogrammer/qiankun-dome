<script setup>
import { h, reactive, ref, createApp } from "vue";
import { useStore } from "vuex";
// import store from 'vuex'
const store = useStore()
const sideBarIndex = ref(0);
const leftBarRef = ref(null);
const sidebar_box = ref(null);
const renderTarget = ref(null)
const sideBarOptions = reactive({
  sideBar: [
    {
      name: "资源管理器",
      icon: "fas fa-folder",
    },
    {
      name: "搜索",
      icon: "fas fa-search",
    },
  ],
  // 处理函数
  events: (obj, index) => {
    return {
      click: () => {
        sideBarIndex.value = index;
        
      },
      dblclick: () => {},
      contextmenu: (e) => {
        e.preventDefault();
        // console.log(store);
        document.onclick = function (event){
          store.commit('unmountDom',{e,event})
        }
        document.oncontextmenu =function (event){
          store.commit('unmountDom',{e,event})
        }
        // 销毁元素
        // const unmountRef = (event) => {
        //   if (!e.target.contains(event.target)) {
        //     if(renderTarget.value){
        //        renderTarget.value.__vue_app__.unmount(leftBarRef.value);
        //        renderTarget.value = null;
        //     }
        //     document.onclick = null;
        //     document.oncontextmenu = null
        //   }
        // };
        // document.onclick = unmountRef
        // document.oncontextmenu = unmountRef

        if (e.target.id == "sidebar_box") {
           // 去除上次sideBar的render
          //  store.commit('unmountDom',true)
          //  const renderTarget = store.state.render.renderTarget
          // if(renderTarget){
          //   debugger
          //      renderTarget.__vue_app__.unmount();
          //     //  renderTarget = null;
          //   }
          createApp(render).mount(e.target);
          // 记录上次挂载的元素方便销毁
          //  renderTarget.value = e.target
          setTimeout(()=>{ store.commit('setRenderTarget',e.target)})
        }
      },
    };
  },
});
const actionBarLeft = reactive([
  {
    name: "文件",
    keyboard: "F",
    class: "first_level",
    children: [
      {
        name: null,
        // 二层
        class: "second_box",
      },
    ],
  },
]);
function render() {
  const renderNode = (node) => {
    return h(
      "div",
      {
        class: node.class,
      },
      node.name,
      node.children ? node.children.map(renderNode) : null
    );
  };

  return h(
    "div",
    {
      ref: "leftBarRef",
      class: "left_bar",
    },
    actionBarLeft.map(renderNode)
  );
}
</script>

<template>
  <div class="sidebar">
    <div
      class="sidebar_box"
      ref="sidebar_box"
      id="sidebar_box"
      v-for="(item, index) in sideBarOptions.sideBar"
      :key="index"
      :class="{ active: index === sideBarIndex }"
      v-on="sideBarOptions.events(item, index)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 50px;
  background-color: #323233;

  .sidebar_box {
    width: 50px;
    height: 30px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .active {
    background-color: #ccc;
    color: #000;
  }
}
</style>
