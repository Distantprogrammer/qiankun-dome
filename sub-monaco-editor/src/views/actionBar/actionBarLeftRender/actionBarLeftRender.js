import { h, reactive, render,defineComponent } from 'vue';
import { renderNode,createElemet } from '@/utils/render.js'
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
/**
 * 初始渲染元素()
 * @param {*} element 渲染的元素  
 * @param {*} className 元素的类名
 * @returns 
 */
export function renderInit(element = 'div', className ='bar',data = []) {
  // Uncaught (in promise) TypeError: Cannot read properties of null (reading 'exposed') 
  // 最外层（即ComponentVue所在的位置）必须是一个vue组件，而不能是普通的元素（如div等），否则会出现异常：
  // 这里我们手动注册一个组件
  return defineComponent({
    render(){
      return  h(
        element,
        {
          class: className
        },
        data.map(renderNode)
      );
    }
  });
  
//  return new Promise((resolve, reject) => {
//     const init_h =  h(
//       element,
//       {
//         class: className
//       },
//       actionBarLeftRenderData.map(renderNode)
//     );
//     resolve(init_h)
//   })
  // const init_h =  h(
  //   element,
  //   {
  //     class: className
  //   },
  //   actionBarLeftRenderData.map(renderNode)
  // );
  // return init_h
}