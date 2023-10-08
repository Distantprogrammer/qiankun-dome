import { renderNode,createElemet,eventFun } from '@/utils/render.js'
import store from "@/store/index";
export const actionBarLeftRenderData = [
  {
    // 用来记录元素级别 同级别元素id使用一样即可，方便销毁
    id:1,
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
          id:2,
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
          id:2,
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
            ]
          }
        },
      ]
    }
  },
  {
    // 用来记录元素级别 同级别元素id使用一样即可，方便销毁
    id:1,
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
          id:2,
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
          id:2,
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
      ]
    }
  },
]
