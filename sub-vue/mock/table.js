const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    input: '@sentence(10, 20)',
    select: "@sentence(10, 20)",
    selectTag: "@sentence(10, 20)",
    textarea: "@sentence(10, 20)",
    date: "@date('yyyy-MM-dd')",
    datetime: "@datetime('yyyy-MM-dd HH:mm:ss')",
    switch: "@boolean()",
    richTextEditor: "@cparagraph(1, 3)",
    imageUpload: "@image('200x100', '#4A7BF7', 'Hello')",
    readonly: "@sentence(10, 20)",
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
