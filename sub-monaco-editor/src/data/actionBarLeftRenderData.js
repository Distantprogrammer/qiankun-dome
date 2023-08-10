import { h, reactive, render } from 'vue';
import { renderNode } from '@/utils/render.js'
import store from "@/store/index";
export const actionBarLeftRenderData = [
  {
    propsOption: function () {
      const that = this
      return {
        class: "first_level",
        id: 'first_level',
        onclick: (e) => {
          const eventCurrentTarget = e.currentTarget
          e.preventDefault();
          const unmountDom = (event) => {
            store.commit('unmountDom', { eventCurrentTarget, event })
          }
          document.onclick = unmountDom
          document.oncontextmenu = unmountDom
           createElemet(e, that.createChildren)
        },
        // const vnode = h('button', {
        //   // 等价于 v-on:click.stop.prevent
        //   onClick: withModifiers(() => {
        //     // ...
        //   }, ['stop', 'prevent'])
        // })

        // 修饰符 如 修饰符:true
        // nativeModifiers:{

        // }
      }
    },
    children: [
      {
        propsOption: {
          class: "first_level_title",
        },
        content: '文件',
      },
      {
        propsOption: {
          class: "first_level_shortcut",
        },
        content: 'F',
      },
    ],
    createChildren: {
      propsOption: {
        class: "second_box",
      },
      children: [
        {
          propsOption: {
            class: "second_level",
          },
          children: [
            {
              propsOption: {
                class: "second_level_title",
              },
              content: '新建文本文件',
            },
            {
              propsOption: {
                class: "second_level_shortcut",
              },
              content: 'Ctrl+N',
            },
          ]
        },
        {
          propsOption: {
            class: "second_level",
          },
          children: [
            {
              propsOption: {
                class: "second_level_title",
              },
              content: '新建文本...',
            },
            {
              propsOption: {
                class: "second_level_shortcut",
              },
              content: 'Ctrl+Alt+Windows+N',
            },
          ]
        },
      ]
    }
  },
  {
    propsOption: function () {
      const that = this
      return {
        class: "first_level",
        id: 'first_level',
        onclick: (e) => {
          const eventCurrentTarget = e.currentTarget
          console.log(eventCurrentTarget);
          e.preventDefault();
          const unmountDom = (event) => {
            store.commit('unmountDom', { eventCurrentTarget, event })
          }
          document.onclick = unmountDom
          document.oncontextmenu = unmountDom
           createElemet(e, that.createChildren)
        },
      }
    },
    children: [
      {
        propsOption: {
          class: "first_level_title",
        },
        content: '文件',
      },
      {
        propsOption: {
          class: "first_level_shortcut",
        },
        content: 'F',
      },
    ],
    createChildren: {
      propsOption: {
        class: "second_box",
      },
      children: [
        {
          propsOption: {
            class: "second_level",
          },
          children: [
            {
              propsOption: {
                class: "second_level_title",
              },
              content: '新建文本文件',
            },
            {
              propsOption: {
                class: "second_level_shortcut",
              },
              content: 'Ctrl+N',
            },
          ]
        },
        {
          propsOption: {
            class: "second_level",
          },
          children: [
            {
              propsOption: {
                class: "second_level_title",
              },
              content: '新建文本...',
            },
            {
              propsOption: {
                class: "second_level_shortcut",
              },
              content: 'Ctrl+Alt+Windows+N',
            },
          ]
        },
      ]
    }
  },
]

function createElemet (e, data) {
  // 不可直接e.currentTarget传下去 需要先接收在传下去，应为js机制会在事件处理完成后某些参数会变null console.log()也会打印为null
  let event = e.currentTarget || e.target.parentNode
  // render(h('p', {}, '动态插入的元素'),event)
  setTimeout(() => {
    render(renderNode(data), event)
    store.commit('setRenderTarget', event)
  })
}