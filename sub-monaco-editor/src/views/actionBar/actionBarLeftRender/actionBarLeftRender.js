import { renderNode,createElemet,eventFun } from '@/utils/render.js'
import store from "@/store/index";
export const actionBarLeftRenderData = [
  {
    propsOption: function () {
      const that = this
      return {
        class: "first_level",
        id: 'first_level',
        onclick:(e)=>{ eventFun(e,that) }
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
          propsOption: function () {
            const that = this
            return {
              class: "second_level",
              id: 'second_level',
              onclick:(e)=>{ eventFun(e,that) }
            }
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
          ],
          createChildren: {
            propsOption: {
              class: "three_box",
            },
            children: [
              {
                propsOption: function () {
                  const that = this
                  return {
                    class: "three_level",
                    id: 'three_level',
                    onclick:(e)=>{ eventFun(e,that) }
                  }
                },
                children: [
                  {
                    propsOption: {
                      class: "three_level_title",
                    },
                    content: '新建文本文件',
                  },
                  {
                    propsOption: {
                      class: "three_level_shortcut",
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
              class: "second_level",
              id: 'second_level',
              onclick:(e)=>{ eventFun(e,that) }
            }
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
          ],
          createChildren: {
            propsOption: {
              class: "three_box",
            },
            children: [
              {
                propsOption: function () {
                  const that = this
                  return {
                    class: "three_level",
                    id: 'three_level',
                    onclick:(e)=>{ eventFun(e,that) }
                  }
                },
                children: [
                  {
                    propsOption: {
                      class: "three_level_title",
                    },
                    content: '新建文本文件2222',
                  },
                  {
                    propsOption: {
                      class: "three_level_shortcut",
                    },
                    content: 'Ctrl+N',
                  },
                ]
              },
              {
                propsOption: {
                  class: "three_level",
                },
                children: [
                  {
                    propsOption: {
                      class: "three_level_title",
                    },
                    content: '新建文本...2222',
                  },
                  {
                    propsOption: {
                      class: "three_level_shortcut",
                    },
                    content: 'Ctrl+Alt+Windows+N',
                  },
                ]
              },
            ]
          }
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
