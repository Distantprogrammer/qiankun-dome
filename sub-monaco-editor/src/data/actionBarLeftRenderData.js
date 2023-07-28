import { h, reactive,render } from 'vue';
import { renderNode } from '@/utils/render.js'

export const actionBarLeftRenderData = [
  {
    propsOption: function(){
      const that = this
      return {
        class: "first_level",
        onclick:function(e){
          createElemet(e,that.createChildren)
        }
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
    createChildren:{
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

function createElemet (e,data) {
  const event = e.currentTarget
  // render(h('p', {}, '动态插入的元素'),event)
  render(renderNode(data),event)
  
}