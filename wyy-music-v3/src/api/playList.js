import request from '@/utils/request'

// 歌单分类
export const playlistCatlist = (params) =>
  request({
    url: '/playlist/catlist',
    params
  })
  // 热门歌单分类
export const playlistHot = (params) =>
  request({
    url: '/playlist/hot',
    params
  })
  // 歌单 ( 网友精选碟 ) order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
export const topPlaylist = (params) =>
  request({
    url: '/top/playlist',
    params
  })
  // 精品歌单标签列表
export const playlistHighqualityTags = (params) =>
  request({
    url: '/playlist/highquality/tags',
    params
  })
  // 获取精品歌单
export const playlistHighquality = (params) =>
  request({
    url: '/top/playlist/highquality',
    params
  })
  // 相关歌单推荐 id : 歌单 id
export const relatedPlaylist = (params) =>
  request({
    url: '/related/playlist',
    params
  })
  // 获取歌单所有歌曲
  // 必选参数 : id : 歌单 id
  // 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
  // 可选参数 : offset : 默认值为0
export const playlistTrack = (params) =>
  request({
    url: '/playlist/track/all',
    params
  })
