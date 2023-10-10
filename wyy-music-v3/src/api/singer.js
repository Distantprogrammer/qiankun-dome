import request from '@/utils/request'

// limit : 返回数量 , 默认为 30 歌手分类列表 offset : 偏移数量，用于分页  type 取值 -1:全部 1:男歌手 2:女歌手 3:乐队 area 取值 -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
export const artistList = (params) =>
  request({
    url: '/artist/list',
    params
  })
