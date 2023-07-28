export const actionBarLeftRenderData = [
  {
    name: '文件',
    keyboard:'F',
    class:"first_level",
    children:[{
      name: null,
      // 二层
      class:"second_box",
      children:[
        {
          name: '新建文本文件',
          keyboard:'Ctrl+N',
          class:"second_level",
        },
        {
          name: '新建文本...',
          keyboard:'Ctrl+Alt+Windows+N',
          class:"second_level",
        },
        {
          name: '新建窗口',
          keyboard:'Ctrl+Shift+N',
          class:"second_level ",
        },
        {
          name: '',
          class:"line_between",
        },
        {
          name: '打开文件...',
          keyboard:'Ctrl+O',
          class:"second_level",
        },
        {
          name: '打开文件夹...',
          keyboard:'Ctrl+K Ctrl+O',
          class:"second_level",
        },
        {
          name: '从文件打开工作区...',
          keyboard:'Ctrl+Alt+Windows+N',
          class:"second_level",
        },
        {
          name: '打开最近的文件',
          keyboard:null,
          class:"second_level  second_level_children", 
          children:[
            {
              name:null,
                // 二层
              class:'three_box',
              children:[
                {
                  name: '重新打开已关闭的编辑器',
                  keyboard:'Ctrl+Shift+T',
                  class:"three_level ",
                },
                {
                  name: '更多',
                  keyboard:'Ctrl+R',
                  class:"three_level ",
                },
                {
                  name: '清除最近打开记录',
                  keyboard:null,
                  class:"three_level ",
                },
              ]
             }
          ]
        },
      ]
    }],
  },
  // {
  //   name: '编辑',
  //   keyboard:'E',
  //   class:"first_level",
  //   children:[{
  //     name: null,
  //     // 二层
  //     class:"second_box",
  //     children:[
  //       {
  //         name: '新建文本文件',
  //         keyboard:'Ctrl+N',
  //         class:"second_level",
  //       },
  //       {
  //         name: '新建文本...',
  //         keyboard:'Ctrl+Alt+Windows+N',
  //         class:"second_level",
  //       },
  //       {
  //         name: '新建窗口',
  //         keyboard:'Ctrl+Shift+N',
  //         class:"second_level ",
  //       },
  //       {
  //         name: '打开文件...',
  //         keyboard:'Ctrl+O',
  //         class:"second_level",
  //       },
  //       {
  //         name: '打开文件夹...',
  //         keyboard:'Ctrl+K Ctrl+O',
  //         class:"second_level",
  //       },
  //       {
  //         name: '从文件打开工作区...',
  //         keyboard:'Ctrl+Alt+Windows+N',
  //         class:"second_level",
  //       },
  //       {
  //         name: '打开最近的文件',
  //         keyboard:null,
  //         class:"second_level  second_level_children", 
  //         children:[
  //           {
  //             name:null,
  //             class:'three_box',
  //             children:[
  //               {
  //                 name: '重新打开已关闭的编辑器',
  //                 keyboard:'Ctrl+Shift+T',
  //                 class:"three_level ",
  //               },
  //               {
  //                 name: '更多',
  //                 keyboard:'Ctrl+R',
  //                 class:"three_level ",
  //               },
  //               {
  //                 name: '清除最近打开记录',
  //                 keyboard:null,
  //                 class:"three_level ",
  //               },
  //             ]
  //            }
  //         ]
  //       },
  //     ]
  //   }],
  // },
]